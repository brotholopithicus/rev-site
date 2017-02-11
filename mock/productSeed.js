const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/revelry');

const Product = require('../models/Product');
//
// const aroundTowner = require('./around-towner');
// const confidant = require('./confidant');
// const continental = require('./continental');
// const escort = require('./escort');

// let products = [aroundTowner, confidant, continental, escort];
let products = [require('./around-towner'), require('./accomplice')];

products.forEach(product => {
    let np = new Product(product);
    np.save(err => {
        if (err) console.log(err);
        console.log('saved');
    });
});
