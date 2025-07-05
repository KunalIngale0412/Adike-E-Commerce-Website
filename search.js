const searchInput = document.querySelector('#search-input');
const productContainer = document.querySelector('.product-container');
const products = Array.from(document.querySelectorAll('.product-container .box'));
const noResultsMessage = document.createElement('p');
noResultsMessage.innerText = "No products found.";
noResultsMessage.style.display = 'none';
productContainer.appendChild(noResultsMessage);

// Ensure DOM is loaded before running search
window.addEventListener('DOMContentLoaded', () => {
    console.log("Search functionality initialized.");
});

// Search Functionality
searchInput.addEventListener('input', () => {
    let searchTerm = searchInput.value.toLowerCase().trim();
    let hasResults = false;
    
    products.forEach(product => {
        let productName = product.querySelector('h2').innerText.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'grid'; // Change to 'block' if using block layout
            hasResults = true;
        } else {
            product.style.display = 'none';
        }
    });
    
    noResultsMessage.style.display = hasResults ? 'none' : 'block';
    console.log(`Search Term: ${searchTerm}, Results Found: ${hasResults}`);
});

