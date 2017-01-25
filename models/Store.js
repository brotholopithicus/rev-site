const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = Schema({
    name: String,
    address: String
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
