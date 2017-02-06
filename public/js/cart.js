const cartContainer = document.querySelector('#cart');
const removeButton = document.querySelectorAll('#removeButton');
if (removeButton) {
    removeButton.forEach(button => {
        button.addEventListener('click', removeButtonClickHandler);
    });
}

function removeButtonClickHandler(e) {
    let parentEl = e.target.parentNode;
    // remove el from DOM
    let cartItem = document.querySelector(`#${parentEl.id}`);
    cartContainer.removeChild(cartItem);
    // update server session + database
    let queryData = {
        name: parentEl.id,
        color: parentEl.dataset.color
    };
    let xhr = new XMLHttpRequest();
    let body = JSON.stringify(queryData);
    xhr.open('PUT', '/cart');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        if (xhr.status === 200) {
          let data = xhr.responseText;
          console.log(data);
        }
    }
    xhr.send(body);
}
