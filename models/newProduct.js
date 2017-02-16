const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema({
    name: String,
    tag: String,
    stock: Number,
    price: Number,
    title: String,
    subtitle: String,
    features: [String],
    details: [String],
    dimensions: {
        x: Number,
        y: Number,
        z: Number
    },
    weight: Number,
    additional: String,
    images: {
        product: [{ title: String, tag: String, data: Buffer }],
        detail: [{ title: String, tag: String, data: Buffer }],
        lifestyle: [{ title: String, tag: String, data: Buffer }]
    }
});

const Product = mongoose.model('newProduct', productSchema);

module.exports = Product;
