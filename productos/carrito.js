let cart = JSON.parse(localStorage.getItem('cart')) || [];


const confirmDeleteEvent = new CustomEvent('confirmDelete', {
    detail: {
        message: '¿Estás seguro de que deseas eliminar este producto?',
        confirmCallback: null,
    }
});


const specialDiscountEvent = new CustomEvent('specialDiscount', {
    detail: {
        discountAmount: 0.1, // 10% de descuento
        message: '¡Felicidades! Se ha aplicado un descuento especial del 10%',
        applyDiscountCallback: null,
    }
});

let discountApplied = false; 

function addToCart(id, name, price) {
    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            id: id,
            name: name,
            price: parseFloat(price),
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    const cartContainer = document.getElementById('cart-container');
    const cartTotal = document.getElementById('cart-total');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
        cartTotal.textContent = 'Total: $0';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
            <button class="remove-btn" data-id="${item.id}">Eliminar</button>
            <button class="increase-btn" data-id="${item.id}">+</button>
            <button class="decrease-btn" data-id="${item.id}">-</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;

    const removeButtons = document.querySelectorAll('.remove-btn');
    const increaseButtons = document.querySelectorAll('.increase-btn');
    const decreaseButtons = document.querySelectorAll('.decrease-btn');

    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            removeFromCartWithConfirmation(id);
        });
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            increaseQuantity(id);
        });
    });

    decreaseButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            decreaseQuantity(id);
        });
    });
}

function removeFromCartWithConfirmation(id) {
    confirmDeleteEvent.detail.confirmCallback = () => removeFromCart(id);
    document.dispatchEvent(confirmDeleteEvent);
}

document.addEventListener('confirmDelete', (event) => {
    const userConfirmed = confirm(event.detail.message);
    if (userConfirmed && event.detail.confirmCallback) {
        event.detail.confirmCallback();
    }
});

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function increaseQuantity(id) {
    const product = cart.find(item => item.id === id);
    if (product) {
        product.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

function decreaseQuantity(id) {
    const product = cart.find(item => item.id === id);
    if (product && product.quantity > 1) {
        product.quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    } else if (product.quantity === 1) {
        removeFromCart(id);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-container')) {
        displayCart();
    }
});


function finalizePurchase() {
    if (cart.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de finalizar la compra.');
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    
    if (total > 100 && !discountApplied) {
        document.dispatchEvent(specialDiscountEvent); 
    } else {
        alert('¡Gracias por tu compra!'); 
        localStorage.removeItem('cart'); 
        location.reload(); 
    }
}

// Event listener para aplicar el descuento especial
document.addEventListener('specialDiscount', (event) => {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    const discount = total * event.detail.discountAmount;
    const newTotal = total - discount;

    alert(`${event.detail.message}. El nuevo total con el descuento aplicado es: $${newTotal.toFixed(2)}`);
    const cartTotal = document.getElementById('cart-total');
    cartTotal.textContent = `Total con descuento: $${newTotal.toFixed(2)}`;
    localStorage.setItem('cart', JSON.stringify(cart));

    discountApplied = true;
    finalizePurchase();
});

document.getElementById('checkout-btn').addEventListener('click', finalizePurchase);
