const fs = require('fs');
const path = require('path');

let name = 'The Continental';

let tag = 'continental';

let title = 'ODOR ABSORBING, WATER RESISTANT';

let subtitle = 'THE CONTINENTAL IS OUR LARGEST DUFFLE BAG; IT IS DESIGNED TO BE ABLE TO HANDLE THE LARGER CARGO.';

let features = ['Dual Carbon Filter',
    'Silicone backed nylon',
    'Custom protective lining',
    'Waterproof zipper',
    'Velcro zipper covering',
    'Lockable',
    'Inner stash pocket',
    'End handles',
    'Genuine leather accents',
    'Removable shoulder strap'
];

let dimensions = {
    x: 30,
    y: 17,
    z: 16
}

let additional = 'Refresh your bag by simply placing in the dryer for a few minutes – until warm – to release all absorbed odors.';

let details = ['The Continental is our largest duffel available. Take it anywhere. With an easily accessible stash pocket, this bag pairs perfectly with our Confidant…or a couple of them. This bag is sealed with a rubber-coated zipper underneath an odor-absorbing Velcro flap. Let this bag do the heavy lifting.', 'Each of our bags are built with our custom system of layers. The outermost layer is a rubber-backed nylon. This material is woven for strength, and backed with rubber for two reasons: to protect the Dual Carbon Filter from water damage, and to add an extra layer of odor protection. Working your way into the bag, there is a Dual Carbon Filter. These layers work together to filter out any unwanted odors. Lastly, we have a cotton lining. It is soft to the touch and also helps to protect the longevity of the Dual Carbon Filter. These bags all have rubber-coated zippers, genuine leather accents, and metal hardware.'];

let newProduct = {
    name,
    tag,
    stock: 100,
    price: 200,
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

console.log(newProduct.images.lifestyle.length);
module.exports = newProduct;
