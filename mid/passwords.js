const bcrypt = require('../node_modules/bcrypt');

exports.hashPassword = function(plainText, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return callback(err);
        bcrypt.hash(plainText, salt, (err, hash) => {
            if (err) return callback(err);
            return callback(null, hash);
        });
    });
}

exports.comparePassword = function(plainText, storedHash, callback) {
    bcrypt.compare(plainText, storedHash, (err, result) => {
        if (err) return callback(err);
        return callback(null, result)
    });
}
