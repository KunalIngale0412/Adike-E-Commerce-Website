let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    cart.classList.remove('active');
    user.classList.remove('active');
    navbar.classList.remove('active');
}
let cart = document.querySelector('.cart');
document.querySelector('#cart-icon').onclick = () => {
    cart.classList.toggle('active');
    search.classList.remove('active');
    user.classList.remove('active');
    navbar.classList.remove('active');
}
let user = document.querySelector('.user');
document.querySelector('#user-icon').onclick = () => {
    user.classList.toggle('active');
    search.classList.remove('active');
    cart.classList.remove('active');
    navbar.classList.remove('active');
}
let navbar = document.querySelector('.navbar');
document.querySelector('#menu-icon').onclick = () => {
    navbar.classList.toggle('active');
    search.classList.remove('active');
    cart.classList.remove('active');
    user.classList.remove('active');
}

window.onscroll = () => {
    search.classList.remove('active');
    cart.classList.remove('active');
    user.classList.remove('active');
    navbar.classList.remove('active');
}

let header = document.querySelector('header');

window.addEventListener('scroll', () =>{
    header.classList.toggle('shadow', window.scrollY > 0);
});



// Swiper
var Swiper = new Swiper(".new-arrival", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay:5500,
        disableOnInteraction:false,
    },
    centeredSlides:true,
    breakpoints:{
        0 : {
            slidesPerView: 0,
        },
        568 : {
            slidesPerView: 2,
        },
        768 : {
            slidesPerView: 2,
        },
        1020 : {
            slidesPerView: 3,
        },
    },
});


// Cart Functionality
let cartItemsContainer = document.querySelector('.cart');
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
updateCartUI();

document.querySelectorAll('.bx-cart-alt').forEach(button => {
    button.addEventListener('click', (e) => {
        let product = e.target.closest('.box');
        let productImg = product.querySelector('img').src;
        let productName = product.querySelector('h2').innerText;
        let productPrice = product.querySelector('span').innerText;
        
        let productId = productName + '-' + productPrice + '-' + productImg; // Ensure uniqueness
        
        let existingItem = cartItems.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            let item = { id: productId, img: productImg, name: productName, price: productPrice, quantity: 1 };
            cartItems.push(item);
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartUI();
    });
});


function updateCartUI() {
    cartItemsContainer.innerHTML = '<h2>Shopping Cart</h2>';
    let total = 0;

    cartItems.forEach(item => {
        let div = document.createElement('div');
        div.classList.add('box');
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="text">
                <h3>${item.name}</h3>
                <span>${item.price}</span>
                <div>
                    <button class="qty-btn decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn increase" data-id="${item.id}">+</button>
                </div>
                <button class="remove-cart" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(div);

        let numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        total += numericPrice * item.quantity;
    });

    // Show total price
    let totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<h3>Total: ₹${total.toFixed(2)}</h3>`;
    cartItemsContainer.appendChild(totalDiv);

    // Handle remove buttons
    document.querySelectorAll('.remove-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            let id = e.target.getAttribute('data-id');
            let itemIndex = cartItems.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                cartItems.splice(itemIndex, 1);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                updateCartUI();
            }
        });
    });

    // ✅ Rebind quantity button handlers inside the UI update
    document.querySelectorAll('.qty-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            let id = e.target.getAttribute('data-id');
            let type = e.target.classList.contains('increase') ? 'increase' : 'decrease';

            let itemIndex = cartItems.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                if (type === 'increase') {
                    cartItems[itemIndex].quantity += 1;
                } else if (cartItems[itemIndex].quantity > 1) {
                    cartItems[itemIndex].quantity -= 1;
                }
                localStorage.setItem('cart', JSON.stringify(cartItems));
                updateCartUI(); // Refresh UI after change
            }
        });
    });
}




// Wishlist Feature Implementation

// Select all wishlist buttons dynamically after DOM load
document.addEventListener("DOMContentLoaded", () => {
    let wishlistButtons = document.querySelectorAll('.wishlist-icon');
    let wishlistContainer = document.querySelector('.wishlist-items');
    let totalPriceContainer = document.querySelector('.total-price');

    if (!wishlistContainer) {
        console.error("Wishlist container not found!");
        return;
    }

    // Load wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => item.img && item.name && !isNaN(item.price)); // Remove invalid items
    localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Save cleaned list
    updateWishlistUI();

    wishlistButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            let product = e.target.closest('.box');
            if (!product) {
                console.error("Product container not found!");
                return;
            }
            
            let productImg = product.querySelector('img')?.src || '';
            let productName = product.querySelector('h2, .product-name')?.innerText.trim() || '';
            let productPriceText = product.querySelector('span, .price')?.innerText || '';
            let productPrice = parseFloat(productPriceText.replace(/[^0-9.]/g, ''));
            
            if (!productImg || !productName || isNaN(productPrice)) {
                alert("Invalid product data. Cannot add to wishlist.");
                console.error("Missing data:", { productImg, productName, productPrice });
                return;
            }
            
            let item = { id: Date.now().toString(), img: productImg, name: productName, price: productPrice };
            wishlist.push(item);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistUI();
        });
    });
});

// Update Wishlist UI
function updateWishlistUI() {
    let wishlistContainers = document.querySelectorAll('.wishlist-items');
    let wishlistContainer = wishlistContainers.length ? wishlistContainers[0] : null; // Use only the first one
    let totalPriceContainer = document.querySelector('.total-price');
    if (!wishlistContainer) return;

    wishlistContainer.innerHTML = '';
    let totalPrice = 0;

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    wishlist.forEach(item => {
        if (!item.img || !item.name || isNaN(item.price)) return; // Skip invalid entries

        let div = document.createElement('div');
        div.classList.add('wishlist-item');
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="details">
                <h3>${item.name}</h3>
                <span>INR ${item.price.toFixed(2)}</span>
                <button class="remove-wishlist" data-id="${item.id}">Remove</button>
            </div>
        `;
        wishlistContainer.appendChild(div);
        totalPrice += item.price;
    });

    if (totalPriceContainer) {
        totalPriceContainer.innerText = `Total Price: ${totalPrice.toFixed(2)}`;
    }

    document.querySelectorAll('.remove-wishlist').forEach(button => {
        button.addEventListener('click', (e) => {
            let id = e.target.getAttribute('data-id');
            let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            wishlist = wishlist.filter(p => p.id !== id);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistUI();
        });
    });
}
