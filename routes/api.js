const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

router.get('/:product', (req, res, next) => {
    Product.findOne({ tagName: req.params.product }, (err, product) => {
        if (err) return next(err);
        return res.json(product);
    });
});

module.exports = router;
