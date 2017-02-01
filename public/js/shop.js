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

function filter(product) {
    document.querySelectorAll('.product-wrapper').forEach(wrapper => {
        if (product === 'all') {
            wrapper.classList.remove('hidden');
        } else if (wrapper.id === product) {
            if (wrapper.classList.contains('hidden')) {
                wrapper.classList.remove('hidden');
            }
        } else {
            if (!wrapper.classList.contains('hidden')) {
                wrapper.classList.add('hidden');
            }
        }
    });
}
