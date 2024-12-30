const router = require("express").Router()
const map_user_request = require("../middleware/map_user");
const UserModel = require('./../model/user.model')
const passwordHash = require('password-hash')
const upload = require('./../middleware/uploader')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const randomString = require('randomstring')

const createToken = user => {
    let token;
    token = jwt.sign({
        userName: user.userName,
        _id: user._id,
        role: user.role
    }, process.env.SECRET_KEY)
    return token;
}

const sender = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "reshamkumar4533@gmail.com",
        pass: "fykluvvqqvjkappv"
    }
});

function prepareMail(data) {
    return {
        from: 'E-shop Support Team', // sender address
        to: data.email, // list of receivers
        subject: "Password Reset Request", // Subject line
        text: `Hi ${data.userName},\n\nWe received a request to reset your password. Please use the link below to reset it:\n${data.link}\n\nIf you did not request a password reset, please ignore this email.\n\nBest regards,\nMERN Stack Support Team`, // plain text body
        html: `
            <p>Hi ${data.userName},</p>
            <p>We received a request to reset your password. Please use the link below to reset it:</p>
            <p><a href="${data.link}">click here to reset password</a></p>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Best regards,</p>
            <p>E-shop Support Team</p>
        `, // html body 
    }
}


router.route("/login") // auth/login
    .get(function (req, res, next) {
        res.json({
            msg: "from get method of login"
        })
    })
    .post(function (req, res, next) {
        const userLogin = UserModel.findOne({
            $or: [
                {
                    email: req.body.userName
                },
                {
                    userName: req.body.userName,
                }
            ]
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
                            user_details: {
                                userName: user.userName,
                                role: user.role,
                                token: token,
                                image: user.image || "",
                                email: user.email
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
        console.log("image", req.body)
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
                            return "http://localhost:8000/file/images/" + item.filename; // original name change to filename
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


router.post("/forgot-password", function (req, res, next) {
    UserModel.findOne({
        email: req.body.email
    })
        .then(user => {
            console.log("user is: ", user)
            if (!user) {
                return res.json({
                    msg: "email not registerd yet!!!",
                    status: 404
                })
            }
            var passwordResetTimeExpiry = Date.now() + (1000 * 60 * 60 * 60)
            var passwordResetToken = randomString.generate(16)
            // preare mail
            var userDetails = {
                email: user.email,
                userName: user.userName,
                link: `${req.headers.origin}/reset-password/${passwordResetToken}`
            }
            var mailContent = prepareMail(userDetails)


            user.passwordResetTimeExpiry = passwordResetTimeExpiry
            user.passwordResetToken = passwordResetToken

            user.save()
                .then(savedUser => {
                    sender.sendMail(mailContent, function (err, done) {
                        if (err) {
                            return next(err)
                        }
                        res.json({
                            msg: "Password reset email sent successfully",
                            status: 404
                        })
                    })
                })
                .catch(err => {
                    return next(err)
                })
        })
        .catch(err => {
            return next(err)
        })
})

router.post("/reset-password/:token", function (req, res, next) {
    UserModel.findOne({
        passwordResetToken: req.params.token,
        passwordResetTimeExpiry: {
            $gte: Date.now()
        }
    })
        .then(user => {
            if (!user) {
                return next({
                    msg: "invalid or expired password reset token",
                    status: 404
                })
            }
            user.password = passwordHash.generate(req.body.newPassword)
            user.passwordResetToken = null;
            user.passwordResetTimeExpiry = null;
            user.save()
                .then(response => {
                    return res.json({
                        msg: "Password reset Successfully!!",
                        status: 200
                    })
                })
                .catch(err => {
                    return next(err)
                })
        })
        .catch(err => {
            return next(err)
        })
})

module.exports = router;
