// Sample product data
const products = [
    {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        price: 89.99,
        image: 'https://images.pexels.com/photos/610945/pexels-photo-610945.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Electronics',
        rating: 4.5,
        description: 'High-quality wireless headphones with noise cancellation and 20-hour battery life.'
    },
    {
        id: 2,
        name: 'Smart Watch Series 5',
        price: 129.99,
        image: 'https://images.pexels.com/photos/3783416/pexels-photo-3783416.jpeg?auto=compress&cs=tinysrgb&w=1200',
        category: 'Electronics',
        rating: 4.2,
        description: 'Track your fitness goals, receive notifications, and more with this advanced smartwatch.'
    }
];

// DOM Elements
const productContainer = document.getElementById('product-container');
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.querySelector('.close');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const newsletterForm = document.getElementById('newsletter-form');

// Shopping cart array
let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    setupEventListeners();
});

function displayProducts() {
    if (!productContainer) {
        console.error('Error: productContainer element not found.');
        return;
    }
    productContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(product.rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= product.rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    productCard.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="price">$${product.price.toFixed(2)}</div>
            <div class="rating">${stars} (${product.rating})</div>
            <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    return productCard;
}

function setupEventListeners() {
    productContainer?.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
    });

    cartIcon?.addEventListener('click', function(e) {
        e.preventDefault();
        cartModal.style.display = 'block';
        updateCartDisplay();
    });

    closeCartBtn?.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-details">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div>
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease-qty" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn increase-qty" data-id="${item.id}">+</button>
            </div>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
}
