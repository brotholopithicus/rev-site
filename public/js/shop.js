fetch('/api/products/all')
    .then(products => {
        products.json().then(result => {
            result.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.id = product.tagName;
                newProduct.classList.add('product-wrapper');
                let newProductHeading = document.createElement('h1');
                newProductHeading.textContent = product.name;
                newProduct.appendChild(newProductHeading);
                product.colors.forEach(color => {
                    let productColor = document.createElement('div');
                    productColor.id = color.name;
                    productColor.classList.add('product-color');
                    productColor.dataset.name = product.tagName;
                    productColor.dataset.color = color.color;
                    productColor.addEventListener('click', productClickHandler);
                    productColor.style.cursor = 'pointer';
                    let data = arrayBufferToBase64(color.buffer.data);
                    let img = document.createElement('img');
                    img.src = 'data:image/jpg;base64,' + data;
                    productColor.appendChild(img);
                    let title = document.createElement('h4');
                    title.textContent = color.name;
                    productColor.appendChild(title);
                    newProduct.appendChild(productColor);
                });
                productContainer.appendChild(newProduct);
            });
        });
    });

function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function productClickHandler(e) {
  let target = verifyNode(e.target, 'product-color');
  let name = target.dataset.name;
  let color = target.dataset.color;
  window.location.href = `/shop/${name}#${color}`;
}
