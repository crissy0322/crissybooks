// Function to load product data from CSV
function loadProducts() {
  const productList = document.getElementById("products");
  productList.innerHTML = ""; // Clear previous products

  fetch("products.csv")
    .then(response => response.text())
    .then(data => {
      const products = data.split("\n").map(row => row.split(","));
      products.shift(); // Remove header row

      products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product");

        productItem.innerHTML = `
          <a href="#" class="product-link" data-id="${product[0]}">
            <img src="${product[4]}" alt="${product[0]}">
            <h3>${product[0]}</h3>
          </a>`;

        productList.appendChild(productItem);
      });
    });
}

// Function to handle product click and display details
function handleProductClick(event) {
  if (event.target.classList.contains("product-link")) {
    const productId = event.target.dataset.id;
    showProductDetails(productId);
  }
}

// Function to load and display product details (implement in script.js)
function showProductDetails(productId) {
  // ... (code to fetch product details and display on separate page)
}

// Call loadProducts on page load
window.addEventListener("DOMContentLoaded", loadProducts);

// Add event listener for product clicks on main page
document.addEventListener("click", handleProductClick);

function handleProductClick(event) {
  if (event.target.closest(".product")) { // Check for click within '.product' element
    const clickedElement = event.target;
    const productId = clickedElement.dataset.id || clickedElement.parentElement.dataset.id; // Get ID from clicked element or its parent
    showProductDetails(productId);
  }
}

function showProductDetails(productId) {
  fetch("products.csv")
    .then(response => response.text())
    .then(data => {
      const products = data.split("\n").map(row => row.split(","));
      const product = products.find(p => p[0] === productId);

      // Create product details HTML (replace with your desired structure)
      const productDetailsHTML = `
        <h2>${product[0]}</h2>
        <p>${product[1]}</p>
        <p>Price: $${product[2]}</p>
        <p>Stock: ${product[3]}</p>
        <img src="${product[4]}" alt="${product[0]}">
        `;

      // Navigate to a new page with product details (replace with your approach)
      const productDetailsPage = window.open("product.html", "_blank"); // Open product.html in a new tab
      productDetailsPage.document.write(productDetailsHTML); // Write product details to new page
    });
}