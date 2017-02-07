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

function filter(product) {
    document.querySelectorAll('.product-wrapper').forEach(wrapper => {
        if (product === 'all') {
            wrapper.classList.remove('hidden');
            wrapper.classList.remove('active');
        } else if (wrapper.id === product) {
            if (wrapper.classList.contains('hidden')) {
                wrapper.classList.remove('hidden');
            }
            if (!wrapper.classList.contains('active')) {
                wrapper.classList.add('active');
            }
        } else {
            if (!wrapper.classList.contains('hidden')) {
                wrapper.classList.add('hidden');
            }
            if (wrapper.classList.contains('active')) {
                wrapper.classList.remove('active');
            }
        }
    });
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
