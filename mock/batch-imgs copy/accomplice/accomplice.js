const fs = require('fs');
const path = require('path');

let name = 'The Accomplice';

let tag = 'accomplice';

let title = 'THE ACCOMPLICE IS THE ULTIMATE CONTAINER; IT IS A FLASK WITH A BUILT-IN STASH COMPARTMENT.';
let subtitle = '';
let features = ['Stainless steel',
    'Screw top attached with bracket',
    'Includes funnel',
    'Spring compartment door'
];

let dimensions = {
    x: 3.75,
    y: 4.75,
    z: 1
}

let weight = 5;

let details = ['Not much left to be desired here. The Accomplice is the quintessential consort for any outing. It is both a flask, and a container for something rolled…dealer’s choice.'];
let additional = '';

let newProduct = {
    name,
    tag,
    stock: 100,
    price: 30,
    title,
    subtitle,
    features,
    details,
    dimensions,
    additional,
    images: {
        product: [],
        detail: [],
        lifestyle: []
    }
}

function readImages() {
    readProductImages();
    readDetailImages();
    readLifestyleImages();
}

function readDetailImages() {
    let images = fs.readdirSync(__dirname + '/detail/');
    images.forEach(image => {
        let tag = image.split('.')[0];
        let title = tag.split('-');
        for (let i = 0; i < title.length; i++) {
            title[i] = titleCase(title[i]);
        }
        title = title.join(' ');
        let data = fs.readFileSync(path.resolve(__dirname, 'detail', image));
        newProduct.images.detail.push({ title, tag, data });
    });
}

function readProductImages() {
    let images = fs.readdirSync(__dirname + '/product/');
    images.forEach(image => {
        let tag = image.split('.')[0];
        let title = tag.split('-');
        for (let i = 0; i < title.length; i++) {
            title[i] = titleCase(title[i]);
        }
        title = title.join(' ');
        let data = fs.readFileSync(path.resolve(__dirname, 'product', image));
        newProduct.images.product.push({ title, tag, data });
    });
}

function readLifestyleImages() {
    let images = fs.readdirSync(__dirname + '/lifestyle/');
    images.forEach(image => {
        let tag = image.split('.')[0];
        let title = tag.split('-');
        for (let i = 0; i < title.length; i++) {
            title[i] = titleCase(title[i]);
        }
        title = title.join(' ');
        let data = fs.readFileSync(path.resolve(__dirname, 'lifestyle', image));
        newProduct.images.lifestyle.push({ title, tag, data });
    });
}
readImages();

function titleCase(str) {
    let titleStr = str
        .toLowerCase()
        .split(' ')
        .map(str => {
            return str.charAt(0).toUpperCase() + str.substr(1);
        });
    return titleStr.join(' ');
}

fs.writeFile(__dirname + `/${tag}.json`, JSON.stringify(newProduct), (err) => {
    if (err) throw err;
    console.log('saved');
});

module.exports = newProduct;
