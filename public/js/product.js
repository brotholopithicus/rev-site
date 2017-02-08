const productData = document.querySelector('.productData');
const productHeader = document.querySelector('#productName');
const productPrice = document.querySelector('#productPrice');
const productStock = document.querySelector('#productStock');
const productTitle = document.querySelector('#productTitle');
const productSubtitle = document.querySelector('#productSubtitle');
const productAdditional = document.querySelector('#additional');
const listOne = document.querySelector('#listOne');
const listTwo = document.querySelector('#listTwo');

const productQuantity = document.querySelector('#addToCartQuantityInput');
const decrementButton = document.querySelector('#decrementButton');
const incrementButton = document.querySelector('#incrementButton');
let quantityChangeButtons = [decrementButton, incrementButton];
quantityChangeButtons.forEach(button => button.addEventListener('click', quantityChangeEventHandler));

function quantityChangeEventHandler(e) {
    e.preventDefault();
    let delta = parseInt(e.target.dataset.value);
    let curr = parseInt(productQuantity.value);
    let result = curr + delta;
    if (result < 1) return;
    productQuantity.value = result;
}

const addToCartProductInput = document.querySelector('#addToCartProductInput');
const addToCartColorInput = document.querySelector('#addToCartColorInput');
const addToCartPriceInput = document.querySelector('#addToCartPriceInput');

const otherColors = document.querySelector('.other-colors');

const product = {
    name: window.location.pathname.split('/')[2],
    color: window.location.hash.slice(1)
}

const colorHeader = document.querySelector('#productColor');
const colorImage = document.querySelector('#productImage');

fetch(`/api/products/${product.name}`).then(
    productName => {
        productName.json().then(result => {
            if (productData) productData.textContent = JSON.stringify(result);
            productPrice.textContent = '$' + result.price.toFixed(2);
            addToCartPriceInput.value = result.price;
            console.log(addToCartPriceInput);
            productStock.textContent = productInStock(result.stock);
            productStock.style.backgroundColor = productStockBackground(result.stock);
            productHeader.textContent = result.name;
            productTitle.textContent = result.title;
            productAdditional.textContent = result.additional;
            productSubtitle.textContent = result.subtitle;
            addToCartProductInput.value = result.tagName;
            result.details.forEach(detail => {
                let el = document.createElement('li');
                el.textContent = detail;
                let list = result.details.indexOf(detail) % 2 === 0 ? listOne : listTwo;
                list.appendChild(el);
            });
            listOne.style.borderRight = '4px solid #000';
            result.colors.forEach(color => {
                if (color.color === product.color) {
                    addToCartColorInput.value = color.color;
                    colorHeader.textContent = color.name;
                    let imgData = arrayBufferToBase64(color.buffer.data);
                    colorImage.src = imgData;
                } else {
                    let colorDiv = document.createElement('div');
                    let colorTitle = document.createElement('span');
                    colorTitle.textContent = color.name;
                    let img = document.createElement('img');
                    let imgData = arrayBufferToBase64(color.buffer.data);
                    img.src = imgData;
                    colorDiv.appendChild(img);
                    colorDiv.appendChild(colorTitle);
                    colorDiv.style.cursor = 'pointer';
                    colorDiv.addEventListener('click', handleChangeColor.bind(color.color));
                    otherColors.appendChild(colorDiv);
                }
            });
        });
    });

function handleChangeColor(e) {
    window.location.assign(`/shop/${product.name}#${this}`);
    fetch(`/api/products/${product.name}?color=${this}`)
        .then(res => {
            res.json()
                .then(color => {
                    addToCartColorInput.value = color.color;
                    let imgData = arrayBufferToBase64(color.buffer.data);
                    colorImage.src = imgData;
                    colorHeader.textContent = color.name;
                });
        });
}

function productInStock(quantity) {
    // TODO: add switch statement later with more details
    let message = quantity > 0 ? 'In Stock' : 'Out of Stock';
    return message;
}

function productStockBackground(quantity) {
    if (quantity === 0) return 'rgba(255, 0, 0, 0.7)';
    return 'rgba(0, 0, 255, 0.7)';
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/jpeg;base64,' + btoa(binary);
}
