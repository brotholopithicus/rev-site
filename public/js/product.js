const productData = document.querySelector('.productData');
const productHeader = document.querySelector('#productName');
const productTitle = document.querySelector('#productTitle');
const productSubtitle = document.querySelector('#productSubtitle');
const productAdditional = document.querySelector('#additional');
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
            productData.textContent = JSON.stringify(result);
            productHeader.textContent = result.name;
            productTitle.textContent = result.title;
            productAdditional.textContent = result.additional;
            productSubtitle.textContent = result.subtitle;
            result.colors.forEach(color => {
                if (color.color === product.color) {
                    colorHeader.textContent = color.name;
                    let data = arrayBufferToBase64(color.buffer.data);
                    colorImage.src = 'data:image/jpeg;base64,' + data;
                } else {
                    let colorDiv = document.createElement('div');
                    let img = document.createElement('img');
                    let imgData = arrayBufferToBase64(color.buffer.data);
                    img.src = 'data:image/jpeg;base64,' + imgData;
                    colorDiv.appendChild(img);
                    colorDiv.addEventListener('click', handleChangeColor.bind(color.color));
                    otherColors.appendChild(colorDiv);
                }
            });
        });
    });

function handleChangeColor(e) {
    window.location.assign(`/shop/${product.name}#${this}`);
    window.location.reload();
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
