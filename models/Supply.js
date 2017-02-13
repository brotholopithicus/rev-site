const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplySchema = Schema({
    title: String,
    tag: String,
    colors: [String],
    images: {
        product: [{
            tag: String,
            data: Buffer
        }],
        lifestyle: [{
            tag: String,
            data: Buffer
        }]
    },
    text: [String]
})
const Supply = mongoose.model('Supply', supplySchema);

module.exports = Supply;
