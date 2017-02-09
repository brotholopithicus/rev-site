const cart = document.querySelector('#cart');

// format item data
const itemNames = document.querySelectorAll('.cart-item-name');
const itemColors = document.querySelectorAll('.cart-item-color');

htmlArrayConcat(itemNames, itemColors).forEach(el => {
    el.textContent = formatDisplayName(el.textContent);
});

// update item totals on manual quantity change
const itemQuantities = document.querySelectorAll('#addToCartQuantityInput');
itemQuantities.forEach(input => {
    input.addEventListener('keydown', itemQuantityChangeHandler);
    input.addEventListener('keyup', itemQuantityChangeHandler);
    input.addEventListener('blur', itemQuantityBlurHandler);
});

// set input field value to 0, if its empty and the user removes focus
function itemQuantityBlurHandler() {
    if (this.value.length === 0) {
        this.value = 0;
    }
    adjustTotalPrice();
}

// update items total price based on user keyboard input
function itemQuantityChangeHandler(e) {
    // restrict input to numbers, backspace, and arrow keys
    let acceptedKeys = [8, 37, 38, 39, 40];
    if (!acceptedKeys.includes(e.keyCode) && !e.key.match(/[0-9]/)) {
        e.preventDefault();
        return;
    }
    let quantity = parseInt(this.value);
    let item = this.closest('.cartItem');
    let totalPrice = item.querySelector('.cart-item-price');
    if (!quantity) {
        totalPrice.textContent = formatUSD(0);
        return;
    }
    let price = parseInt(item.dataset.price);
    totalPrice.textContent = formatUSD(price * quantity);
    adjustTotalPrice();
}


// decrement/increment button click event handlers
let decrementButtons = document.querySelectorAll('#decrementButton');
let incrementButtons = document.querySelectorAll('#incrementButton');
htmlArrayConcat(decrementButtons, incrementButtons).forEach(button => button.addEventListener('click', itemQuantityClickHandler));

function itemQuantityClickHandler(e) {
    let item = this.closest('.cartItem');
    let input = document.querySelector(`input[data-index="${item.dataset.index}"]`);
    let result = parseInt(this.dataset.value) + parseInt(input.value);
    input.value = result;
    input.parentNode.nextSibling.textContent = formatUSD(result * item.dataset.price);
    adjustTotalPrice();
}

// calculate total price
function calculateTotalPrice() {
    let total = 0;
    document.querySelectorAll('.cart-item-price').forEach(el => {
        let val = parseInt(el.textContent.substr(1));
        total += val;
    });
    return formatUSD(total);
}

// update total price display
function adjustTotalPrice() {
    document.querySelector('.cart-price-total').textContent = 'Total: ' + calculateTotalPrice();
}

// remove item event handler
const removeItemButtons = document.querySelectorAll('#removeButton');
removeItemButtons.forEach(button => button.addEventListener('click', removeItemClickHandler));

function removeItemClickHandler(e) {
    let parentNode = e.target.closest('.cartItem');
    let data = {
        name: parentNode.dataset.name,
        color: parentNode.dataset.color
    }

    let xhr = new XMLHttpRequest();
    let body = JSON.stringify(data);
    xhr.open('PUT', '/cart');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);

    cart.removeChild(parentNode);
}

/* HELPER FUNCTIONS */

// format Number to USD
function formatUSD(num) {
    return '$' + num.toFixed(2);
}

// create arrays from HTML Collections and concat
function htmlArrayConcat(arrOne, arrTwo) {
    return Array.from(arrOne).concat(Array.from(arrTwo));
}

// capitalize first letter of word
function titleCase(str) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}

// deal with unusual characters in item names
function formatDisplayName(str) {
    let hyphen = str.split('').includes('-');
    let underscore = str.split('').includes('_');
    if (hyphen || underscore) {
        let arr = str.split(/([-]|[_])/);
        return titleCase(arr[0]) + ' ' + titleCase(arr[2]);
    } else {
        return titleCase(str);
    }
}

(function() {
    adjustTotalPrice();
})();

/** MUTATION OBSERVER **/
// const target = document.querySelector('.cart-item-price');
// const observer = new MutationObserver((mutations) => {
//     mutations.forEach(mutation => {
//         console.log(mutation);
//     });
// });
// let config = { attributes: true, childList: true, characterData: true };
// observer.observe(target, config);
// const itemPrices = document.querySelectorAll('.cart-item-price');
// itemPrices.forEach(item => {
//   observer.observe(item, config);
// });
