const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = Schema({
    name: String,
    address: String,
    coords: {
        latitude: Number,
        longitude: Number
    }
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
