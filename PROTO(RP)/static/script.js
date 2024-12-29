document.addEventListener('DOMContentLoaded', () => {
    console.log('script.js loaded');

    
    loadCart();

   
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', placeOrder);
    }
});


let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log('Initial cart:', cart);


function addToCart(name, price) {
    const item = { name, price };
    cart.push(item);

   
    localStorage.setItem('cart', JSON.stringify(cart));

    
    console.log('Cart after adding item:', cart);

    alert(`${name} has been added to your cart!`);
}


function loadCart() {
    console.log('loadCart function is running...');
    const cartContainer = document.querySelector('.cart-container');
    const totalContainer = document.querySelector('.cart-total');
    const proceedBtn = document.querySelector('.proceed-btn');

    
    console.log('Loading cart items:', cart);

    if (!cartContainer || !totalContainer || !proceedBtn) {
        console.error('Cart elements not found in the DOM.');
        return;
    }

   
    cartContainer.innerHTML = '';
    let total = 0;

   
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        totalContainer.textContent = 'Total: ₹0.00';
        proceedBtn.style.display = 'none';
        return;
    }

    
    cart.forEach((item, index) => {
        console.log(`Adding item: ${item.name}, ₹${item.price}`);
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <p>${item.name} - ₹${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
        total += item.price;
    });

    // Update total and show proceed button
    totalContainer.textContent = `Total: ₹${total.toFixed(2)}`;
    proceedBtn.style.display = cart.length ? 'block' : 'none';
}


function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}


function placeOrder(event) {
    event.preventDefault(); 

    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const pincode = document.getElementById('pincode').value;

    
    const orderId = Math.floor(Math.random() * 1000000); 
    const orderMessage = `Order placed successfully! Your Order ID is: #${orderId}`;

    
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert';

    
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy Order ID';
    copyButton.onclick = () => {
        navigator.clipboard.writeText(`#${orderId}`).then(() => {
            alert('Order ID copied to clipboard!');
        });
    };

   
    alertDiv.innerHTML = `<p>${orderMessage}</p>`;
    alertDiv.appendChild(copyButton);
    document.body.appendChild(alertDiv);

   
    setTimeout(() => {
        alertDiv.classList.add('fade-out');
        setTimeout(() => alertDiv.remove(), 1500);
    }, 5000); 

   
    document.getElementById('checkout-form').reset();

   
    window.location.href = `${orderConfirmationUrl}?orderId=${orderId}`;
}
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty! Please add items before proceeding.');
        return;
    }

   
    const checkoutUrl = "{{ url_for('checkout') }}"; 
    window.location.href = checkoutUrl;
}



const termsPopup = document.getElementById('terms-popup');


const termsLink = document.getElementById('terms-link');


const closeBtn = document.getElementsByClassName('close-btn')[0];

termsLink.onclick = function(event) {
    event.preventDefault(); 
    termsPopup.style.display = 'block'; 
}


closeBtn.onclick = function() {
    termsPopup.style.display = 'none'; 
}


window.onclick = function(event) {
    if (event.target == termsPopup) {
        termsPopup.style.display = 'none'; 
    }
}

