const imgWrapper = document.querySelector('.img-wrapper');
// const lifestyleImgWrapper = document.querySelector('.lifestyle-img-wrapper');
const supplyProductHeader = document.querySelector('.supply-product-header');
// const largeImageWrapper = document.querySelector('.large-image-wrapper');

function productName() {
    return window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1);
}

fetch(`/api/supply/${productName()}`)
    .then(res => res.json().then(data => renderImages(data)));

function renderImages(images) {
    images.product.forEach(image => createImageElement(image, imgWrapper));
    images.lifestyle.forEach(image => createLifestyleImage(image));
}

function createLifestyleImage(image) {
    switch (image.tag) {
        case 'IMG_001':
            let base64ImageData = formatBase64Image(image.data);
            supplyProductHeader.style.background = `url(${base64ImageData})`;
            supplyProductHeader.style.backgroundSize = 'cover';
            break;
        case 'large':
            createImageElement(image, document.querySelector('.large-img-wrapper'));
            break;
        case 'fabric':
            createImageElement(image, document.querySelector('.fabric-img-wrapper'));
            break;
        default:
            createImageElement(image, document.querySelector('.large-img-wrapper'));
            break;
    }
}

function createImageElement(image, parentElement) {
    let base64ImageData = formatBase64Image(image.data);
    let imgContainer = document.createElement('div');
    let img = document.createElement('img');
    img.src = base64ImageData;
    imgContainer.appendChild(img);
    parentElement.appendChild(imgContainer);
}

function formatBase64Image(data) {
    return 'data:image/jpeg;base64,' + btoa(data);
}
