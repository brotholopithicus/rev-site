const productContainer = document.querySelector('.product-container');
const products = document.querySelectorAll('.product');
const productName = document.querySelector('#product-name');

products.forEach(product => {
    product.addEventListener('click', productClickHandler);
});

function verifyNode(el, test) {
    if (el.classList.contains(test)) {
        return el;
    } else if (el.parentNode.classList.contains(test)) {
        return el.parentNode;
    } else {
        verifyNode(el.parentNode, test);
    }
}

function productClickHandler(e) {
    let p = verifyNode(e.target, 'product');
    products.forEach(product => {
        if (product.classList.contains('active')) {
            product.classList.remove('active');
        }
    });
    p.classList.add('active');
    setActiveTab(p);
}

function setActiveTab(product) {
    filter(product.dataset.product);
}

function titleCase(str) {
    let titleStr = str
        .toLowerCase()
        .split(' ')
        .map(str => {
            return str.charAt(0).toUpperCase() + str.substr(1);
        });
    return titleStr.join(' ');
}
