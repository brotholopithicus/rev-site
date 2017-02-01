const path = require('path');
const fs = require('fs');

let name = 'The Around-Towner';
let tagName = 'around-towner';
let title = 'ODOR ABSORBING, WATER RESISTANT';
let subtitle = 'THE AROUND-TOWNER IS JUST AS THE NAME WOULD SUGGEST; IT IS THE PERFECT INTERMEDIATE SIZE DUFFLE FOR DAILY BUSINESS.';

let details = 'Dual Carbon Filter, Silicone backed nylon, Custom protective lining, Waterproof zipper, Velcro zipper covering, Lockable, Inner stash pocket, End handles, Genuine leather accents, Removable shoulder strap';
details = details.split(', ');

let dimensions = {
    x: 24,
    y: 14,
    z: 13
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
    let resolvedPath = path.join(__dirname, '/img/around-towner/' + color.color + '.jpg');
    let buffer = fs.readFileSync(resolvedPath);
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
    price: 150,
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
fs.writeFile('mock/around-towner.json', JSON.stringify(newProduct), 'utf8', (err) => {
    if (err) throw err;
    console.log('done!');
});
