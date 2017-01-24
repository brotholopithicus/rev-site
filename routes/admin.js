const express = require('express');
const router = express.Router();

const mid = require('../mid');

/* GET admin page */
router.get('/', (req, res, next) => {
    mid.admin(req.session.user, (err, result) => {
        if (err || !result) return next(err);
        return res.render('admin');
    });
});

module.exports = router;
