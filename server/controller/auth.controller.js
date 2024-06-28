const router = require("express").Router()
const map_user_request = require("../middleware/map_user");
const UserModel = require('./../model/user.model')
const passwordHash = require('password-hash')
const upload = require('./../middleware/uploader')
const jwt = require('jsonwebtoken')

const createToken = user => {
    let token;
    token = jwt.sign({
        userName: user.userName,
        _id: user._id,
        role: user.role
    }, process.env.SECRET_KEY)
    return token;
}

router.route("/login") // auth/login
    .get(function (req, res, next) {
        res.json({
            msg: "from get method of login"
        })
    })
    .post(function (req, res, next) {
        const userLogin = UserModel.findOne({
            userName: req.body.userName,
        })
            .then(user => {
                // find => returns array, empty array
                // findOne => returns object, undefined

                // console.log("user is: ", user)
                // if(!user[0]){
                //     return next({
                //         msg:"invalid username",
                //         status:400
                //     })
                // }
                if (!user) {
                    return next({
                        msg: "invalid username",
                        status: 400
                    })
                }
                if (user.isVerified) {
                    return next({
                        msg: "User not verified, please verify your account",
                        status: 400
                    })
                }
                if (user) {
                    var verifyPassword = passwordHash.verify(req.body.password, user.password)
                    if (verifyPassword) {
                        var token = createToken(user)
                        res.json({
                            msg: "login successfullly",
                            user: user,
                            user_details: {
                                userName: user.userName,
                                role:user.role,
                                token:token
                            },
                            status: 200
                        })
                    }
                    else {
                        return next({
                            msg: "Invalid Password",
                            status: 400
                        })
                    }
                }
            })
            .catch(err => {
                return next(err)
            })
    });

router.route('/register')
    .post(upload.array('img'), function (req, res, next) {
        UserModel.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    return next({
                        msg: "User already exist",
                        status: 400
                    })
                }
                if (!user) {
                    if (req.fileTypeError) {
                        return next({
                            msg: "Invalid File Format",
                            status: 400
                        })
                    }
                    // newUser is mongoose object
                    const newUser = new UserModel({})
                    if (req.files) {
                        // fs module
                        // console.log("req.file.mimetype: ", req.file.mimetype.split('/'))
                        // if(req.file.mimetype.split('/')[0] !== 'image'){
                        //     return next({
                        //         msg: "Invalid file format",
                        //         status:400
                        //     })
                        // }
                        req.body.image = req.files.map((item) => {
                            return item.originalname;
                        })
                    }
                    map_user_request(req.body, newUser)
                    newUser.isVerified = req.body.isVerified
                    newUser.password = passwordHash.generate(req.body.password)
                    newUser.save()
                        .then(user => {
                            res.json(user)
                        })
                        .catch(err => {
                            return next(err)
                        })
                }
            })
            .catch(err => {
                return next(err)
            })
    })

module.exports = router;