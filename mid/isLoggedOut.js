module.exports = function(req, res, next) {
    if (!req.session.userId) return next();
    let err = new Error('You Are Already Logged In. Please Logout First');
    err.status = 404;
    return next(err);
}
