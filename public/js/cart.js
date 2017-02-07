const cartContainer = document.querySelector('#cart');
const removeButton = document.querySelectorAll('#removeButton');
const emptyCartHeader = document.querySelector('#emptyCartHeader');
const cartItems = document.querySelectorAll('.cartItem');
const cartItemNames = document.querySelectorAll('.cart-item-name');
const cartItemColors = document.querySelectorAll('.cart-item-color');
const cartItemTotal = document.querySelector('.cart-item-total');

// adjust quantity
const productQuantities = document.querySelectorAll('#addToCartQuantityInput');
const quantityChangeButtons = [document.querySelectorAll('#incrementButton'), document.querySelectorAll('#decrementButton')];
quantityChangeButtons.forEach(buttonType => {
    buttonType.forEach(button => {
        button.addEventListener('click', quantityChangeEventHandler);
    });
});

function quantityChangeEventHandler(e) {
    e.preventDefault();
    let productQuantity = e.target.parentNode.children[1];
    let totalPrice = e.target.parentNode.parentNode.children[3];
    let price = e.target.parentNode.parentNode.dataset.price;
    let delta = parseInt(e.target.dataset.value);
    let curr = parseInt(productQuantity.value);
    let result = curr + delta;
    if (result < 1) return;
    productQuantity.value = result;
    totalPrice.textContent = '$' + (result * price).toFixed(2);
    adjustTotal();
}

if (removeButton) {
    removeButton.forEach(button => {
        button.addEventListener('click', removeButtonClickHandler);
    });
}

function verifyNode(el, test) {
    if (el.classList.contains(test)) {
        return el;
    } else if (el.parentNode.classList.contains(test)) {
        return el.parentNode;
    } else {
        verifyNode(el.parentNode, test);
    }
}

function removeButtonClickHandler(e) {
    let parentEl = verifyNode(e.target.parentNode, 'cartItem');
    let cartItem = document.querySelector(`#${parentEl.id}`);
    cartContainer.removeChild(cartItem);
    let queryData = {
        name: parentEl.id,
        color: parentEl.dataset.color
    };
    let xhr = new XMLHttpRequest();
    let body = JSON.stringify(queryData);
    xhr.open('PUT', '/cart');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
    updateOnEmptyCart();
    adjustTotal();
}

const updateOnEmptyCart = () => {
    if (cartContainer.children.length > 1) {
        emptyCartHeader.innerHTML = '&nbsp;';
    } else {
        emptyCartHeader.textContent = `There's nothing here... yet.`;
    }
}

updateOnEmptyCart();

cartItemNames.forEach(el => {
    let name = el.parentNode.id;
    let displayName;
    if (name.split('').includes('-')) {
        let arr = name.split('-');
        displayName = formatName(arr[0]) + '-' + formatName(arr[1]);
    } else {
        displayName = formatName(name);
    }
    el.textContent = 'The ' + displayName;
});

cartItemColors.forEach(el => {
    let color = el.parentNode.dataset.color;
    el.textContent = formatName(color);
});
let cartItemPrices = document.querySelectorAll('.cart-item-price');
cartItemPrices.forEach(el => {
    el.textContent = '$' + parseInt(el.parentNode.dataset.price).toFixed(2);
});

function formatName(name) {
    return name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
}

function calculateTotalPrice() {
    let total = 0;
    cartItemPrices = document.querySelectorAll('.cart-item-price');
    cartItemPrices.forEach(el => {
        let val = parseInt(el.textContent.substr(1));
        total += val;
    });
    return total;
}

function adjustTotal() {
    let total = calculateTotalPrice();
    cartItemTotal.textContent = 'Total: $' + total.toFixed(2);
}
adjustTotal();

// TODO: quantity input event listeners for change, keyup, keydown, and whatever
