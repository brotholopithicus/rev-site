const express = require('express');
const router = express.Router();

const User = require('../models/User');

const mid = require('../mid');

router.use(mid.isLoggedIn);
router.use(mid.isAdmin);

/* GET admin page */
router.get('/', (req, res, next) => {
  User.findById(req.session.userId, (err, user) => {
    if(err) return next(err);
    return res.render('admin', { message: `You're an administrator! Congratulations!`, user });
  });
});

module.exports = router;
