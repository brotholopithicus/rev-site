var express = require('express');
var router = express.Router();

const Product = require('../models/Product');

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.session);
    res.render('index', { title: 'Home' });
});

/* GET login page. */
router.get('/login', (req, res, next) => {
    res.render('users/login');
});

/* GET signup page. */
router.get('/signup', (req, res, next) => {
    res.render('users/signup');
});

/* GET exploits page. */
router.get('/exploits', (req, res, next) => {
    res.render('exploits');
});

/* GET exploit page. */
router.get('/exploit/:exploit', (req, res, next) => {
    let exploit = req.params.exploit;
    res.render('exploit', { exploit });
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
    res.render('shop');
});

/* GET product page. */
router.get('/shop/:product', (req, res, next) => {
    res.render('product');
});

module.exports = router;
