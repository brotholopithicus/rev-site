module.exports = function(req, res, next) {
    if (req.session && req.session.userId) return next();
    let err = new Error('You Must Log In To View This Page');
    err.status = 404;
    return next(err);
}
