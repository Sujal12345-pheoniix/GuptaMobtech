
let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
        const card = e.target.closest('.product-card');
        const product = {
            name: card.querySelector('h3').textContent,
            price: card.querySelector('.price').textContent,
            quantity: 1
        };
        
        addToCart(product);
        updateCartUI();
    });
});

function addToCart(product) {
    cart.push(product);
    alert(`${product.name} added to cart!`);
}

function updateCartUI() {
   
    const cartLink = document.querySelector('a[href="#cart"]');
    cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${cart.length})`;
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});


document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
    
        button.classList.add('active');
        
        const category = button.dataset.category;
        filterProducts(category);
    });
});

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        product.classList.remove('animate-fade-in');
        
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
            setTimeout(() => {
                product.classList.add('animate-fade-in');
            }, 0);
        } else {
            product.style.display = 'none';
        }
    });
}


function createRating(rating) {
    const ratingContainer = document.createElement('div');
    ratingContainer.className = 'rating';
    
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        if (i <= rating) {
            star.className = 'fas fa-star';
        } else if (i - 0.5 <= rating) {
            star.className = 'fas fa-star-half-alt';
        } else {
            star.className = 'far fa-star';
        }
        ratingContainer.appendChild(star);
    }
    
    return ratingContainer;
}


function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
    

    cartCount.classList.add('animate-bounce');
    setTimeout(() => {
        cartCount.classList.remove('animate-bounce');
    }, 300);
}


function createQuickView(product) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="product-details">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <span class="price">${product.price}</span>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

function updateCartPage() {
    const cartItems = document.querySelector('.cart-items');
    const emptyMessage = document.querySelector('.empty-cart-message');
    
    if (cart.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" width="100">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>${item.price}</p>
            </div>
            <div class="item-quantity">
                <button onclick="updateQuantity('${item.id}', 'decrease')">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity('${item.id}', 'increase')">+</button>
                <button onclick="removeItem('${item.id}')" class="remove-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.price.slice(1)) * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 10;
    const total = subtotal + shipping;
    
    document.querySelector('.subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.shipping').textContent = `$${shipping.toFixed(2)}`;
    document.querySelector('.total-amount').textContent = `$${total.toFixed(2)}`;
}


document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});


window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});


document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
       
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        

        tab.classList.add('active');
        document.querySelector(`#${tab.dataset.tab}Form`).classList.add('active');
    });
});


document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Add your login logic here
    console.log('Login attempt:', { email, password });
    alert('Login functionality to be implemented');
});


document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    console.log('Signup attempt:', { name, email, password });
    alert('Signup functionality to be implemented');
});

// Password visibility toggle
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
} 
