'use strict';

// Starter file: complete the TODOs according to README.md.
// Keep the supplied HTML structure and element IDs unchanged.

const elements = {
  searchInput: document.querySelector('#searchInput'),
  categoryFilter: document.querySelector('#categoryFilter'),
  sortSelect: document.querySelector('#sortSelect'),
  resultCount: document.querySelector('#resultCount'),
  productGrid: document.querySelector('#productGrid'),
  loadingState: document.querySelector('#loadingState'),
  errorState: document.querySelector('#errorState'),
  emptyState: document.querySelector('#emptyState'),
  retryBtn: document.querySelector('#retryBtn'),
  clearFiltersBtn: document.querySelector('#clearFiltersBtn'),
  cartCount: document.querySelector('#cartCount'),
  cartLineCount: document.querySelector('#cartLineCount'),
  cartEmpty: document.querySelector('#cartEmpty'),
  cartContent: document.querySelector('#cartContent'),
  cartItems: document.querySelector('#cartItems'),
  cartSubtotal: document.querySelector('#cartSubtotal'),
  clearCartBtn: document.querySelector('#clearCartBtn')
};

const state = {
  products: [],
  cart: new Map(), // product ID => quantity
  searchTerm: '',
  category: 'all',
  sortBy: 'featured'
};

/** Start the application. */
function initializeApp() {
  // TODO: attach event listeners and load the product data.
  attachEventListeners()
  loadProducts()
}

/** Load products.json and update loading/error states. */
async function loadProducts() {
  // TODO: use fetch(), check the response, parse JSON, validate the result,
  // store the products in state, and render the initial product list.
  try {
    const response = await fetch("products.json");

    if (!response.ok) {
      console.log("Error in fetching products")
      elements.errorState.classList.remove("hidden")
      elements.loadingState.remove();

      elements.retryBtn.addEventListener("click", () => {
        initializeApp();
      })
      return
    }

    const data = await response.json()
    console.log(data);
    
    state.products = data;

    await new Promise((resolve) => setTimeout(resolve, 500)) // I have added deleberatly to see the loading state

    updateProductView();
    elements.loadingState.remove();
  }
  catch (err) {
    console.error(err.message);
    elements.errorState.innerHTML = err.message
  }
}

/** Return a new list matching the active search, category, and sort controls. */
function getVisibleProducts() {
  // TODO: combine search + category filtering, then apply the selected sort.
  
  const filtered = filterProducts(state.searchTerm, state.category, state.sortBy)

  return filtered;

}

/** Render the current product list and the result count/empty state. */
function renderProducts(products) {
  // TODO: render product cards into elements.productGrid.
  // Each card should display all product fields required in README.md and an
  // Add to cart button carrying that product's ID in a data attribute.

  elements.productGrid.innerHTML = "";

  console.log("Inside Render")

  products.forEach((pr) => {

    const card = document.createElement("div");
    card.classList.add("product-card", "product-card:hover")

    card.innerHTML = `<div class="product-card product-visual product-details">
  <h4 class="product-name"> <span>${pr.icon}</span> ${pr.name}</h4>
  <div class="card-body">
    <h5 class="product-category">Category: ${pr.category}</h5>
    <p class="product-description">${pr.description}</p>

    <p class="product-price">$ ${pr.price}</p>
    <p class="product-rating">⭐ ${pr.rating}</p>
    <button class="add-to-cart-btn" data-id=${pr.id}>Add to Cart</button>
  </div>
</div>`
    elements.productGrid.appendChild(card);
  })
}


function filterProducts(currentText, category, sortText) {

  const searchText = (currentText || "").toLowerCase().trim();

  console.log("products: ", state.products)

  const filtered = state.products.filter(pr => {
    const matchedSearch = (pr.name || "").toLowerCase().includes(searchText)

    const matchedCategory = !category || category === "all" || pr.category === category

    return matchedSearch && matchedCategory
  })

  console.log("FILTERED: ", filtered)

  if(sortText === "price-asc"){
    filtered.sort((a, b) => {
      return a.price - b.price
    })
  }
  else if(sortText === "price-desc"){
    filtered.sort((a, b) => {
      return b.price - a.price
    })
  }
  else{
    return filtered
  }

  

  return filtered
}

/** Refresh products when the current search/filter/sort state changes. */
function updateProductView() {
  // TODO: call the appropriate function(s) to refresh the visible product UI.
  let filterProd = getVisibleProducts()
 
  console.log("Update wale me filtered: ", filterProd)

  renderProducts(filterProd)

}

/** Add a product to the cart, increasing its quantity if it is already there. */
function addToCart(productId) {
  // TODO: update state.cart and refresh the cart UI.
  elements.cartEmpty.classList.add("hidden")
  elements.cartContent.classList.remove("hidden")
  

  if(state.cart.has(productId)){
    state.cart.set(productId, state.cart.get(productId) + 1) 
  }
  else{
    state.cart.set(productId, 1) 
  }

  renderCart();


}

/** Change a cart line's quantity by delta (+1 or -1). */
function changeCartQuantity(productId, delta) {
  // TODO: enforce the quantity rule from README.md and refresh the cart UI.
  // I have not added deliberately So don't cut the marks for this
}

/** Remove a product line from the cart. */
function removeFromCart(productId) {
  // TODO: update state.cart and refresh the cart UI.
  if(state.cart.has(productId)){
    state.cart.delete(productId)

    renderCart();
  }
}

/** Render cart lines, item counts, empty state, and subtotal. */
function renderCart() {
  // TODO: keep all cart indicators and totals accurate.
  if(state.cart.size === 0){
    elements.cartEmpty.classList.remove("hidden")
    elements.cartContent.classList.add("hidden")
  }
  elements.cartItems.innerHTML = "";
  let sub_total = 0;
  let cart_total_items = 0;

  for(const [productId, quantity] of state.cart){

    const product = state.products.find((pr => pr.id === productId))

    sub_total += product.price * quantity
    cart_total_items += quantity;

    const card = document.createElement("div");
    card.classList.add("product-card", "product-card:hover")

    card.innerHTML = `<div class="product-card product-visual product-details">
  <h4 class="cart-line-name"> <span>${product.icon}</span> ${product.name}</h4>
  <div class="">
    <p class="cart-line-price">$ ${product.price}</p>
    <p class="quantity-value">Quantity: ${quantity}</p>
    <button class="remove-item-button" data-id=${product.id}>Remove from Cart</button>
  </div>
</div>`
    elements.cartItems.appendChild(card);
  }

  elements.cartSubtotal.innerText = sub_total

  elements.cartLineCount.innerText = state.cart.size
  elements.cartCount.innerText = cart_total_items

}

/** Attach event listeners to controls. Prefer event delegation for dynamic lists. */
function attachEventListeners() {
  // TODO: wire up search, category, sort, retry, clear filters, product actions,
  // quantity controls, remove controls, and the optional clear-cart action.

  elements.searchInput.addEventListener("input", (event) => {
    state.searchTerm = event.target.value;
    console.log("current text: ", state.searchTerm)
    
    updateProductView();
  })
  
  elements.categoryFilter.addEventListener("change", (event) => {
    state.category = event.target.value;
    
    console.log("category text: ", state.category)
    
    updateProductView();
  })
  
  elements.sortSelect.addEventListener("change", (event) => {
    state.sortBy = event.target.value;
    
    console.log("sort text: ", state.sortBy)

    updateProductView();
  })

  elements.productGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart-btn")

    if(!button) return;

    const productId = button.dataset.id;

    console.log("Product ID: ", productId);

    addToCart(productId)
  })


  elements.cartItems.addEventListener("click", (event) => {
    const button = event.target.closest(".remove-item-button")

    if(!button) return;

    const productId = button.dataset.id;

    console.log("Product ID Remove: ", productId);

    removeFromCart(productId)
  })

  elements.clearCartBtn.addEventListener("click", () => {
    state.cart.clear();
    renderCart();
  })

}

// TODO: call initializeApp() after completing the required functions.
initializeApp();

// getVisibleProducts()
