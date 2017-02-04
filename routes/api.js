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
    if (req.params.product === 'all') {
        Product.find({}, (err, products) => {
            if (err) return next(err);
            return res.json(products);
        });
    } else {
        Product.findOne({ tagName: req.params.product }, (err, product) => {
            if (err) return next(err);
            if (!req.query.color) return res.json(product);
            product.colors.forEach(color => {
                if (color.color === req.query.color) return res.json(color);
            });

        });
    }
});

module.exports = router;
