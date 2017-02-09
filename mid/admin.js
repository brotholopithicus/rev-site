module.exports = function(req, res, next) {
    const User = require('../models/User');
    User.findById(req.session.userId, (err, user) => {
        if (err) return next(err);
        if (!user.admin) return next(new Error('Not Authorized'));
        return next();

    });
}
