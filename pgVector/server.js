import dotenv from "dotenv";
dotenv.config();

import express from "express";
import pg from "pg";
import { GoogleGenAI } from "@google/genai";

const { Pool } = pg;
const app = express();
app.use(express.json());

const {
  GEMINI_API_KEY,
  PGHOST,
  PGPORT,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  PORT,
} = process.env;


console.log({
  PGHOST,
  PGPORT,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
});

if (!GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY environment variable.");
}

const pool = new Pool({
  host: PGHOST,
  port: Number(PGPORT),
  user: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
});

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function getEmbedding(text) {
  const result = await ai.models.embedContent({
    model: "gemini-embedding-2",
    contents: text,
    config: {
      outputDimensionality: 768,
    },
  });

  const values = result.embeddings?.[0]?.values;
  if (!values || !Array.isArray(values)) {
    throw new Error("Gemini did not return a valid embedding.");
  }

  return `[${values.join(",")}]`;
}

async function ensureSchema() {
  await pool.query(`CREATE EXTENSION IF NOT EXISTS vector;`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS docs (
      id bigserial PRIMARY KEY,
      title text NOT NULL,
      body text NOT NULL,
      embedding vector(768) NOT NULL
    );
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS docs_embedding_hnsw
    ON docs
    USING hnsw (embedding vector_cosine_ops);
  `);
}

app.get("/health", async (_req, res) => {
  res.json({ ok: true });
});

app.post("/seed-demo", async (_req, res) => {
  try {
    const demoDocs = [
      {
        title: "Docker deployment",
        body: "Docker packages applications in containers and helps deploy web apps",
      },
      {
        title: "Container basics",
        body: "Containers isolate applications and make deployments portable",
      },
      {
        title: "Cake recipe",
        body: "This recipe explains how to bake a chocolate cake",
      },
    ];

    for (const doc of demoDocs) {
      const embedding = await getEmbedding(
        `title: ${doc.title} | text: ${doc.body}`
      );

      await pool.query(
        `INSERT INTO docs (title, body, embedding)
         VALUES ($1, $2, $3::vector)`,
        [doc.title, doc.body, embedding]
      );
    }

    res.json({ message: "Demo documents inserted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/search", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Please send a valid 'query' string." });
    }

    const queryEmbedding = await getEmbedding(
      `task: search result | query: ${query}`
    );

    const result = await pool.query(
      `
      SELECT
        id,
        title,
        body,
        embedding <=> $1::vector AS cosine_distance
      FROM docs
      ORDER BY embedding <=> $1::vector
      LIMIT 5;
      `,
      [queryEmbedding]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

async function start() {
  await ensureSchema();

  app.listen(Number(PORT), () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  console.error("Startup failed:", error);
  process.exit(1);
});