var express = require('express');
var router = express.Router();

const Product = require('../models/Product');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Home' });
});

/* GET login page. */
router.get('/login', (req, res, next) => {
    res.send('LOGIN PAGE');
});

/* GET signup page. */
router.get('/signup', (req, res, next) => {
    res.send('SIGNUP PAGE');
});

/* GET exploits page. */
router.get('/exploits', (req, res, next) => {
    res.render('exploits');
});

/* GET legal page. */
router.get('/legal', (req, res, next) => {
    res.render('legal');
});

/* GET locations page. */
router.get('/locations', (req, res, next) => {
    res.render('locations');
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
