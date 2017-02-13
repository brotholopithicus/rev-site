const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// reviews
// tag
// product images
// product lifestyle images
// stock
// price
// 
const productSchema = Schema({
    name: String,
    tagName: String,
    stock: Number,
    price: Number,
    title: String,
    subtitle: String,
    details: [String],
    dimensions: {
        x: Number,
        y: Number,
        z: Number
    },
    weight: Number,
    additional: String,
    colors: [{
        name: String,
        color: String,
        buffer: Buffer
    }]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
