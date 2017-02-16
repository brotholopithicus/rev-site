const fs = require('fs');
const path = require('path');

let name = 'The Escort';
let tag = 'escort';
let title = 'ODOR ABSORBING, WATER RESISTANT';
let subtitle = 'THE ESCORT IS OUR BACKPACK.  WITH MULTIPLE COMPARTMENTS, IT WORKS WELL TO CARRY ALL ACCESSORIES.';

let features = 'Dual Carbon Filter, Silicone backed nylon, Custom protective lining, Waterproof zipper, Lockable, Laptop divider, Double side pockets, Secret inner stash pocket, Genuine leather accents, Metal hardware';
features = features.split(', ');

let dimensions = {
    x: 17,
    y: 13,
    z: 5
}

let additional = 'Refresh your bag by simply placing in the dryer for a few minutes – until warm – to release all absorbed odors.';

let details = ['The Escort is your companion, it’s along for the ride. With multiple compartments, this bag has a little bit of everything. If you look close enough you might just find our hidden stash pocket, just the right size for the Accomplice. There is a laptop divider and phone pocket to support all the technology you may need to carry with you.', 'Each of our bags are built with our custom system of layers. The outermost layer is a rubber-backed nylon. This material is woven for strength, and backed with rubber for two reasons: to protect the Dual Carbon Filter from water damage, and to add an extra layer of odor protection. Working your way into the bag, there is a Dual Carbon Filter. These layers work together to filter out any unwanted odors. Lastly, we have a cotton lining. It is soft to the touch and also helps to protect the longevity of the Dual Carbon Filter. These bags all have rubber-coated zippers, genuine leather accents, and metal hardware.'];

let newProduct = {
    name,
    tag,
    stock: 100,
    price: 70,
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

fs.writeFile(__dirname + '/escort.json', JSON.stringify(newProduct), (err) => {
    if (err) throw err;
    console.log('saved');
});

module.exports = newProduct;
