const fs = require('fs');
const path = require('path');

let name = 'The Confidant';

let tag = 'confidant';

let title = 'ODOR ABSORBING, WATER RESISTANT';

let subtitle = 'THE CONFIDANT IS A SMALLER, SINGLE POCKET BAG FOR JUST THE ESSENTIALS.';

let features = ['Dual Carbon Filter',
    'Silicone backed nylon',
    'Custom protective lining',
    'Double velcro seal'
];

let dimensions = {
    x: 11,
    y: 6,
    z: 0
}

let additional = 'Refresh your bag by simply placing in the dryer for a few minutes – until warm – to release all absorbed odors.';

let details = ['Let’s keep it simple. The Confidant is basic… but in a good way. This double Velcro sealed, single pocket pouch, is ideal for the essentials. Carry it alone or toss it in one of our other bags.', 'Each of our bags are built with our custom system of layers. The outermost layer is a rubber-backed nylon. This material is woven for strength, and backed with rubber for two reasons: to protect the Dual Carbon Filter from water damage, and to add an extra layer of odor protection. Working your way into the bag, there is a Dual Carbon Filter. These layers work together to filter out any unwanted odors. Lastly, we have a cotton lining. It is soft to the touch and also helps to protect the longevity of the Dual Carbon Filter. These bags all have rubber-coated zippers, genuine leather accents, and metal hardware.'];

let newProduct = {
    name,
    tag,
    stock: 100,
    price: 25,
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
