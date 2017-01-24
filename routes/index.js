var express = require('express');
var router = express.Router();

const Product = require('../models/Product');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Home' });
});

/* GET shop page. */
router.get('/shop', (req, res, next) => {
    Product.find({}, (err, products) => {
        if (err) return next(err);
        products.forEach(p => {
            p.colors.forEach(col => {
                col.buffer = col.buffer.toString('base64');
            });
        });
        res.render('shop', { products });
    });
});

module.exports = router;
