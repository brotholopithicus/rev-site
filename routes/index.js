// generate express router object
var express = require('express');
var router = express.Router();

// import mongoose models
const Product = require('../models/Product');
const User = require('../models/User');

// import middleware
const mid = require('../mid');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Home' });
});

/* GET logout page. */
router.get('/logout', mid.isLoggedIn, (req, res, next) => {
    // destroy session object and redirect home
    req.session.destroy(err => {
        if (err) return next(err);
        return res.redirect('/');
    });
});

/* GET profile page. */
router.get('/profile', mid.isLoggedIn, (req, res, next) => {
    // find user by session-stored user id and render profile page
    User.findById(req.session.userId, (err, user) => {
        if (err) return next(err);
        if (!user) return res.redirect('/');
        return res.render('profile', { username: user.username });
    });
});

/* GET exploits page. */
router.get('/exploits', (req, res, next) => {
    res.render('exploits');
});

/* GET exploit page. */
router.get('/exploit/:exploit', (req, res, next) => {
    res.render('exploit', { exploit: req.params.exploit });
});

/* GET legal page. */
router.get('/legal', (req, res, next) => {
    res.render('legal');
});

/* GET locations page. */
router.get('/locations', (req, res, next) => {
    res.render('locations');
    // res.render('storeLocations');
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
            if (user.admin) return res.redirect('/admin');
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

/* GET cart page. */
router.get('/cart', (req, res, next) => {
    if (req.session.userId) {
        User.findById(req.session.userId, (err, user) => {
            if (err) return next(err);
            if (!user) return res.render('cart', { cart: req.session.cart });
            req.session.cart = user.cart;
            return res.render('cart', { cart: user.cart });
        });
    } else {
        return res.render('cart', { cart: req.session.cart || [] });
    }
});

/* POST cart. */
router.post('/cart', (req, res, next) => {
    let product = {
        name: req.body.productName,
        color: req.body.productColor,
        price: req.body.productPrice,
        quantity: parseInt(req.body.productQuantity)
    };
    if (product.name && product.color && product.quantity && product.price) {

        function updateCart(query, arr) {
            let filteredCart = arr.filter(item => item.name === query.name && item.color === query.color);
            if (filteredCart.length > 0) {
                arr[arr.indexOf(filteredCart[0])].quantity += query.quantity;
            } else {
                arr.push(query);
            }
            return arr;
        }

        if (req.session.userId) {
            User.findById(req.session.userId, (err, user) => {
                if (err) return next(err);
                user.cart = updateCart(product, user.cart);
                user.save();
                req.session.cart = user.cart;
            });
        } else {
            req.session.cart = updateCart(product, req.session.cart || []);
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
    let name = req.body.name;
    let color = req.body.color;
    if (!name || !color) {
        let err = new Error('Something Went Wrong');
        err.status = 500;
        return next(err);
    }

    req.session.cart.splice(req.session.cart.indexOf({ name, color }, 1));

    if (req.session.userId) {
        User.findById(req.session.userId, (err, user) => {
            if (err) return next(err);
            user.cart = req.session.cart;
            user.save();
            return res.end();
        });
    } else {
        return res.end();
    }
});

module.exports = router;
