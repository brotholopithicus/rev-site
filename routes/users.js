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

module.exports = router;
