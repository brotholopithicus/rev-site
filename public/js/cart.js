// cart.ctrl.js
/* ~~~~~~ display cart ~~~~~~ */
const cart = document.querySelector('#cart');
// format item data
const itemNames = document.querySelectorAll('.cart-item-name');
const itemColors = document.querySelectorAll('.cart-item-color');
Array.from(itemNames).concat(Array.from(itemColors)).forEach(el => {
    el.textContent = formatDisplayName(el.textContent);
});

function titleCase(str) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}

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

// update item totals on quantity change
// decrement/increment buttons
// text input
// display cart total on page load
// update cart total on item quantity change
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
