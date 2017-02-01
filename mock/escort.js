const path = require('path');
const fs = require('fs');

let name = 'The Escort';
let tagName = 'escort';
let title = 'ODOR ABSORBING, WATER RESISTANT';
let subtitle = 'THE ESCORT IS OUR BACKPACK.  WITH MULTIPLE COMPARTMENTS, IT WORKS WELL TO CARRY ALL ACCESSORIES.';

let details = 'Dual Carbon Filter, Silicone backed nylon, Custom protective lining, Waterproof zipper, Lockable, Laptop divider, Double side pockets, Secret inner stash pocket, Genuine leather accents, Metal hardware';
details = details.split(', ');

let dimensions = {
    x: 17,
    y: 13,
    z: 5
}

let additional = 'Refresh your bag by simply placing in the dryer for a few minutes – until warm – to release all absorbed odors.';

let colors = [{
        name: 'Black',
        color: 'black'
    },
    {
        name: 'Navy Blue',
        color: 'blue'
    },
    {
        name: 'Striped Dark Grey',
        color: 'striped_grey'
    },
    {
        name: 'Crosshatch Grey',
        color: 'grey'
    }, {
        name: 'Light Grey',
        color: 'light_grey'
    },
    {
        name: 'Green',
        color: 'green'
    }
];

let buffers = colors.map(color => {
    let resolvedPath = path.join(__dirname, '/img/escort/' + color.color + '.jpg');
    let file = fs.readFileSync(resolvedPath);
    let buffer = new Buffer(file);
    return {
        name: color.name,
        color: color.color,
        buffer
    }
});

let newProduct = {
    name,
    tagName,
    stock: 100,
    price: 70,
    title,
    subtitle,
    details,
    dimensions,
    additional,
    colors: []
}

for (let i = 0; i < buffers.length; i++) {
    let prod = buffers[i];
    newProduct.colors.push({ name: prod.name, color: prod.color, buffer: prod.buffer });
}
fs.writeFile('mock/escort.json', JSON.stringify(newProduct), 'utf8', (err) => {
    if (err) throw err;
    console.log('done!');
});

module.exports = newProduct;
