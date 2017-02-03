const path = require('path');
const fs = require('fs');
const PRODUCT = 'accomplice';
let name = 'The Accomplice';
let tagName = 'accomplice';
let title = 'THE ACCOMPLICE IS THE ULTIMATE CONTAINER; IT IS A FLASK WITH A BUILT-IN STASH COMPARTMENT.';
let subtitle = '';

let details = 'Stainless steel, Screw top attached with bracket, Includes funnel, Spring compartment door';
details = details.split(', ');

let dimensions = {
    x: 3.75,
    y: 4.75,
    z: 1
}
let weight = 5;

let additional = '';

let colors = [{
  name: 'Silver',
  color: 'silver'
}];

let buffers = colors.map(color => {
    let resolvedPath = path.join(__dirname, `/img/${PRODUCT}/` + color.color + '.jpg');
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
    price: 30,
    title,
    // subtitle,
    details,
    dimensions,
    weight,
    // additional,
    colors: []
}

for (let i = 0; i < buffers.length; i++) {
    let prod = buffers[i];
    newProduct.colors.push({ name: prod.name, color: prod.color, buffer: prod.buffer });
}
fs.writeFile(`mock/${PRODUCT}.json`, JSON.stringify(newProduct), 'utf8', (err) => {
    if (err) throw err;
    console.log('done!');
});

module.exports = newProduct;
