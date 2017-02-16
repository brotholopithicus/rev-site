const fs = require('fs');
const path = require('path');

const express = require('express');
const router = express.Router();

const Product = require('../models/Product');
const Store = require('../models/Store');
const Supply = require('../models/Supply');
const newProduct = require('../models/newProduct');

const mid = require('../mid');

/* GET location data. */
router.get('/locations', (req, res, next) => {
    Store.find((err, stores) => {
        if (err) return next(err);
        return res.json(stores);
    });
});

/* GET supply. */
router.get('/supply/:product', (req, res, next) => {
    newProduct.findOne({ tag: req.params.product }, (err, doc) => {
        if (err) return next(err);
        let images = {
            detail: [],
            product: [],
            lifestyle: []
        }
        doc.images.detail.forEach(image => {
            let binaryData = mid.imageBuffer(image.data);
            images.detail.push({ title: image.title, tag: image.tag, data: binaryData });
        });
        doc.images.lifestyle.forEach(image => {
            let binaryData = mid.imageBuffer(image.data);
            images.lifestyle.push({ title: image.title, tag: image.tag, data: binaryData });
        });
        doc.images.product.forEach(image => {
            let binaryData = mid.imageBuffer(image.data);
            images.product.push({ title: image.title, tag: image.tag, data: binaryData });
        });
        return res.json(images);
    });
});

/* POST user coords */
router.post('/locations', (req, res, next) => {
    let userCoords = req.body;
    Store.find({}, (err, stores) => {
        if (err) return next(err);
        let sorted = [];
        stores.forEach(store => {
            let distance = mid.distance(userCoords, store.coords).toFixed(1);
            sorted.push({ name: store.name, address: store.address, distance, coords: store.coords });
        });
        sorted.sort((a, b) => a.distance - b.distance);
        return res.json(sorted);
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
