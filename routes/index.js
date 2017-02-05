var express = require('express');
var router = express.Router();

const Product = require('../models/Product');
const User = require('../models/User');

const mid = require('../mid');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Home' });
});

/* GET logout page. */
router.get('/logout', mid.isLoggedIn, (req, res, next) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) return next(err);
            return res.redirect('/');
        });
    }
});

/* GET profile page. */
router.get('/profile', mid.isLoggedIn, (req, res, next) => {
    User.findById(req.session.userId, (err, user) => {
        if (err) return next(err);
        return res.render('profile', { username: user.username });
    });
});

/* GET cart page. */
router.get('/cart', (req, res, next) => {
    if (req.session.userId) {
        User.findById(req.session.userId, (err, user) => {
            if (err) return next(err);
            if (!user) return res.render('cart', { cart: req.session.cart });
            return res.render('cart', { cart: user.cart });
        });
    } else {
        return res.render('cart', { cart: req.session.cart });
    }
});

/* POST cart. */
router.post('/cart', (req, res, next) => {
    let product = { name: req.body.productName, color: req.body.productColor };
    if (product.name && product.color) {
        req.session.cart.push(product);
        if (req.session.userId) {
            User.findById(req.session.userId, (err, user) => {
                if (err) return next(err);
                user.cart.push(product);
                user.save();
            });
        }
        return res.redirect('/cart');
    } else {
        let err = new Error('How can you add something to your cart if you\'re not adding something to your cart?');
        err.status = 405;
        return next(err);
    }
});

/* PUT update cart. */
router.put('/cart', (req, res, next) => {
  console.log(req.bod);
  let name = req.body.productName;
  let color = req.body.productColor;
    if (!name || !color) return next();
    req.session.cart.filter(item => {
        return item !== { name, color }
    });
    if (req.session.userId) {
        User.findById(req.session.userId, (err, user) => {
            if (err) return next(err);
            user.cart = req.session.cart;
            user.save();
        });
    }
    return res.redirect('/cart');
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

/* GET login page. */
router.get('/login', mid.isLoggedOut, (req, res, next) => {
    res.render('users/login');
});

/* POST user login. */
router.post('/login', mid.isLoggedOut, (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        User.findOne({ username }, (err, user) => {
            if (err || !user) return next(err ? err : new Error('User Not Found'));
            req.session.userId = user._id;
            return res.redirect('/profile');
        });
    } else {
        let err = new Error('All Fields Required');
        err.status = 401;
        return next(err);
    }
});
/* GET signup page. */
router.get('/signup', mid.isLoggedOut, (req, res, next) => {
    res.render('users/signup');
});

/* POST user signup. */
router.post('/signup', mid.isLoggedOut, (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    if (username && password && confirmPassword) {
        if (password !== confirmPassword) {
            let err = new Error('Passwords Do Not Match');
            err.status = 400;
            return next(err);
        }
        let user = new User({ username, password });
        user.save((err, user) => {
            if (err) return next(err);
            req.session.userId = user._id;
            return res.redirect('/profile');
        });
    } else {
        let err = new Error('All Fields Required');
        err.status = 400;
        return next(err);
    }
});
module.exports = router;
