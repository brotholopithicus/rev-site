const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/revelry');
const Supply = require('../../../models/Supply');

const supply = {
    colors: ['black', 'crosshatch-grey', 'green', 'light-grey', 'navy-blue', 'striped-grey'],
    paragraphs: ['The Escort is your companion, it’s along for the ride. With multiple compartments, this bag has a little bit of everything. If you look close enough you might just find our hidden stash pocket, just the right size for the Accomplice. There is a laptop divider and phone pocket to support all the technology you may need to carry with you.', 'Each of our bags are built with our custom system of layers. The outermost layer is a rubber-backed nylon. This material is woven for strength, and backed with rubber for two reasons: to protect the Dual Carbon Filter from water damage, and to add an extra layer of odor protection. Working your way into the bag, there is a Dual Carbon Filter. These layers work together to filter out any unwanted odors. Lastly, we have a cotton lining. It is soft to the touch and also helps to protect the longevity of the Dual Carbon Filter. These bags all have rubber-coated zippers, genuine leather accents, and metal hardware.'],
    images: ['large', 'small', 'lifestyle']
}

function populateObject() {
    let title = 'Escort';
    let tag = 'escort';
    let colors = supply.colors;
    let text = supply.paragraphs;
    let images = {
        product: [],
        lifestyle: []
    };
    colors.forEach(color => {
        let data = fs.readFileSync(__dirname + '/img/' + color + '.jpg');
        images.product.push({ tag: color, data });
    });
    fs.readdir(__dirname + '/img/lifestyle', (err, files) => {
        files.forEach(file => {
            let data = fs.readFileSync(__dirname + '/img/lifestyle/' + file);
            let tag = file.split('.')[0];
            images.lifestyle.push({ tag, data })
        });
    });
    return { title, tag, colors, text, images };
}
let obj = populateObject();

fs.writeFile(__dirname + '/escort.json', JSON.stringify(obj), (err) => {
    if (err) throw err;
    console.log('saved');
});

setTimeout(function() {
    let s = new Supply(obj);
    s.save();
}, 2000);
