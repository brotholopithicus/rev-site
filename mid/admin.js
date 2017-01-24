const User = require('../models/User');

module.exports = function(user, callback) {
    User.findOne({ user }, (err, user) => {
        if (err) return callback(err, false);
        if (!user || !user.isAdmin) return callback(new Error('User Not Authorized'), false);
        return callback(null, true);
    });
}
