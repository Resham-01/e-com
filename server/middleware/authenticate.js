const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    var token;
    if (req.headers["authorization"]) {
        token = req.headers["authorization"]
    }
    if (req.query.token) {
        token = req.query.token
    }

    if (token) {
        // verify token

        var verifyToken = jwt.verify(token, process.env.SECRET_KEY, function (err, user) {
            if (err) {
                return next(err)
            }
            if (user) {
                console.log("user in authentication: ", user)
                req.user = user
                next()
            }
            else {
                return next({
                    msg: "invalid token, you don't have access",
                    status: 400
                })
            }
        })
    }
    else {
        return next({
            msg: "you don't have access, please login to continue",
            status: 400
        })
    }
}