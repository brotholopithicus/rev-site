const path = require('path');
const fs = require('fs');

let name = 'The Continental';
let tagName = 'continental';
let title = 'ODOR ABSORBING, WATER RESISTANT';
let subtitle = 'THE CONTINENTAL IS OUR LARGEST DUFFLE BAG; IT IS DESIGNED TO BE ABLE TO HANDLE THE LARGER CARGO.'

let details = 'Dual Carbon Filter, Silicone backed nylon, Custom protective lining, Waterproof zipper, Velcro zipper covering, Lockable, Inner stash pocket, End handles, Genuine leather accents, Removable shoulder strap';
details = details.split(', ');

let dimensions = {
    x: 30,
    y: 17,
    z: 16
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
  console.log(color);
    let resolvedPath = path.join(__dirname, '/img/continental/' + color.color + '.jpg');
    let file = fs.readFileSync(resolvedPath);
    let buffer = new Buffer(file);
    return {
        name: color.name,
        color: color.color,
        buffer
    }
});

let newProduct = {
    name: name,
    tagName,
    stock: 100,
    price: 200,
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

fs.writeFile('mock/continental.json', JSON.stringify(newProduct), 'utf8', (err) => {
    if (err) throw err;
    console.log('done!');
});

module.exports = newProduct;
