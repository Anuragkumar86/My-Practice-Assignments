# Front-End Hiring Simulation — Assignment 1

## Product Explorer

**Role:** Front-End Developer Intern / Junior  
**Time limit:** 75 minutes  
**Technology:** HTML, CSS, Vanilla JavaScript (ES6+)  
**Difficulty:** Beginner → Intermediate  
**Total:** 100 points (+10 bonus)

### Scenario

You have joined the front-end team at a small e-commerce company. A designer has already created the product browsing page and a developer has supplied a local JSON dataset. The page structure and styling are in place, but the interactive behavior is incomplete.

Your task is to finish the page so customers can find products and manage a small shopping cart.

### Start the assessment

1. Extract this folder to your computer.
2. Open the folder in VS Code.
3. Run it using a local web server, such as the **Live Server** extension in VS Code. Open `index.html` through that server, not directly as a `file://` URL, because the task loads `products.json` with `fetch()`.
4. Open browser DevTools → Console so you can see any errors.
5. Start a 75-minute timer when you begin implementation.

No package installation is needed. The starter project intentionally uses plain HTML, CSS, and JavaScript.

### Candidate instructions

- `index.html` and the initial `styles.css` are supplied starter files. **Do not change the structure or IDs in `index.html`.** Small accessibility fixes are allowed, but they are not required to complete the core task.
- Implement the missing behavior in `script.js`.
- You may add or adjust CSS in `styles.css` for the bonus section, but don't spend your time redesigning the page before the core features work.
- Use the provided `products.json` data. Do not hard-code the products into the HTML.
- Do not use React, Vue, jQuery, Bootstrap, or other libraries/frameworks. Use browser APIs and vanilla JavaScript.
- You may consult official documentation during practice, as you could in many take-home assessments. Try not to look up a complete solution.
- Focus on correctness, clear code, sensible state management, and edge cases—not on adding unrelated features.

## Requirements

### A. Load and display products — 20 points

1. Load `products.json` using `fetch()` when the page starts.
2. Show the supplied loading state while data is being loaded.
3. Render a product card for each product in the JSON file.
4. Each card must display the product icon, name, category, description, price, rating, and an **Add to cart** button.
5. If loading fails, show a useful error state and allow the user to retry.

### B. Search, filter, and sort — 25 points

1. The search field filters products by name as the user types. Search must be case-insensitive.
2. The category dropdown filters products by the chosen category. `All categories` shows every category.
3. The sort dropdown supports:
   - Featured / default order
   - Price: low to high
   - Price: high to low
4. Search, category filtering, and sorting must work together. For example, a search term must remain applied when the user changes the category.
5. Update the visible product count whenever the result set changes.
6. When no products match, show the provided empty state and make **Clear filters** restore the full product list.

### C. Shopping cart — 25 points

1. Clicking **Add to cart** adds that product to the cart.
2. Adding the same product again increments its quantity instead of creating a duplicate cart line.
3. The cart displays each selected product's name, unit price, and quantity.
4. The `+` and `−` controls change the quantity. A quantity must never be zero or negative; remove the line when its quantity reaches zero.
5. The remove control removes that product from the cart.
6. Keep the cart badge/item count and subtotal accurate after every change.
7. When the cart is empty, show the supplied empty-cart message. When it contains items, show the cart lines and subtotal.

**Definition:** The cart item count is the sum of quantities, not the number of distinct product lines. The subtotal is the sum of `price × quantity` for every cart line.

### D. Reliability and code quality — 20 points

- No uncaught errors during normal use.
- Buttons and controls continue to work after the product list is re-rendered.
- Keep product data separate from cart state.
- Avoid duplicating the same filtering/sorting logic in multiple places.
- Use readable function names and keep responsibilities reasonably separated.
- Handle missing/invalid data or fetch errors gracefully where practical.

### E. Accessibility and responsive polish — 10 points

- The interface remains usable at a narrow mobile width.
- Interactive controls have understandable accessible names and a visible keyboard focus state.
- Loading, empty, and error messages are understandable.

### Optional bonus — up to 10 points

- Add a **Clear cart** action that resets cart state and updates the UI.
- Prevent accidental duplicate event listeners after re-rendering.
- Add a small automated test or a concise manual test checklist to `NOTES.md`.
- Improve responsive layout or accessibility without breaking existing behavior.

## Expected user behavior

A reviewer should be able to load the page, search for a product, filter by category, sort by price, add multiple products, change quantities, remove products, and see the item count and subtotal update correctly.

## What to submit back in this practice session

When you finish, send me:

1. Your completed `script.js` (paste it here or upload it).
2. Any changes you made to `styles.css`.
3. A short note with the time you spent and what you found hardest.

I will review it like an interviewer: score each section, test edge cases, identify bugs, and explain improvements. I will **not** provide the solution before you make your attempt.
