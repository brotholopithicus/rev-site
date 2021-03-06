const productData = document.querySelector('.productData');
const productHeader = document.querySelector('#productName');
const productTitle = document.querySelector('#productTitle');
const productSubtitle = document.querySelector('#productSubtitle');
const productAdditional = document.querySelector('#additional');
const listOne = document.querySelector('#listOne');
const listTwo = document.querySelector('#listTwo');
const addToCartProductInput = document.querySelector('#addToCartProductInput');
const addToCartColorInput = document.querySelector('#addToCartColorInput');
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
                    let img = document.createElement('img');
                    let imgData = arrayBufferToBase64(color.buffer.data);
                    img.src = imgData;
                    colorDiv.appendChild(img);
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

function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/jpeg;base64,' + btoa(binary);
}
