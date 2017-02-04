var express = require('express');
var router = express.Router();

const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({}, (err, users) => {
        if (err) return next(err);
        return res.send(users);
    });
});

/* POST user registration. */
router.post('/signup', (req, res, next) => {
    let user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });
    user.save((err, user) => {
        if (err) return next(err);
        req.session.user = user;
        console.log(user);
        res.redirect('/');
    });
});
/* POST user verification. */
router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return next(err);
        if (!user) return next(new Error('User Not Found'));
        user.checkPassword(req.body.password, (err, result) => {
            if (err) return next(err);
            if (!result) return next(new Error('Incorrect Password'));
            req.session.user = user;
            res.redirect('/');
        });
    });
});

module.exports = router;
