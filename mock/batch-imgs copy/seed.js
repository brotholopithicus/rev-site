const fs = require('fs');
const path = require('path');
const DIR = path.resolve(__dirname);


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/revelry');



const Product = require('../../models/newProduct');

const products = [require('./accomplice/accomplice'), require('./around-towner/around-towner'), require('./confidant/confidant'), require('./continental/continental'), require('./escort/escort')];

products.forEach(product => {
    let p = new Product(product);
    p.save(err => {
        if (err) return console.log(err);
        console.log('saved');
    });
});
