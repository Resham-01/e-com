module.exports=(req, res, next) =>{
    var username = req.query.username;
    var password = req.query.password;
    var role = req.query.role;
    if (username=="resham" && password=="12345" && role=="admin") {
        // res.send("product add access")
        next(   )
    }
    else {
        res.send("authentication fail")
    }
}