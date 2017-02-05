const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passwords = require('../mid').passwords;

const userSchema = Schema({
    name: String,
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    cart: [{
      name: String,
      color: String
    }]
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    passwords.hashPassword(this.password, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

userSchema.methods.checkPassword = function(plainText, callback) {
    passwords.comparePassword(plainText, this.password, (err, result) => {
        if (err) return callback(err);
        return callback(null, result);
    });
}
const User = mongoose.model('User', userSchema);

module.exports = User;
