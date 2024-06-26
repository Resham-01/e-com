module.exports = function (req, res, next) {
    if (req.query.isAdmin) {
        next()
    }
    else {
        next({
            msg: "you don't have access",
            status: 400
        })
    }
}