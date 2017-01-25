const express = require('express');
const router = express.Router();

const Product = require('../models/Product');
const Store = require('../models/Store');

/* GET location data. */
router.get('/locations', (req, res, next) => {
    Store.find((err, stores) => {
        if (err) return next(err);
        return res.json(stores);
    });
});

/* GET product data */
router.get('/products/:product', (req, res, next) => {
    Product.findOne({ tagName: req.params.product }, (err, product) => {
        if (err) return next(err);
        console.log(product);
        return res.json(product);
    });
});

module.exports = router;
