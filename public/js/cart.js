const cartContainer = document.querySelector('#cart');
const removeButton = document.querySelectorAll('#removeButton');
const emptyCartHeader = document.querySelector('#emptyCartHeader');

if (removeButton) {
    removeButton.forEach(button => {
        button.addEventListener('click', removeButtonClickHandler);
    });
}

function removeButtonClickHandler(e) {
    let parentEl = e.target.parentNode;
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
}

function updateOnEmptyCart() {
    if (cartContainer.children.length > 0) {
        emptyCartHeader.style.display = 'none';
    } else {
        emptyCartHeader.style.display = '';
    }
}

updateOnEmptyCart();
