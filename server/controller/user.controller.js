const express = require("express")
const router = express.Router()
const UserModel = require("./../model/user.model")

const map_user_request = require("./../middleware/map_user")


// console.log("__dirname of user controller", __dirname)
// console.log("root directory of user controller", process.cwd())

// routing level middleware

router.route("/search")
    .get(function (req, res, next) {
        res.json({
            msg: "from search view of user"
        })
    })
    .post(function (req, res, next) {
        res.json({
            msg: "from search post of user"
        })
    })


// get all user 
router.get("/view", function (req, res, next) {
    // res.json({
    //     msg:"from view method of user"
    // })

    console.log("logged in user: ", req.user.userName)

    var searchCondition = {}
    // projection logic
    UserModel
        .find(searchCondition, {
            // userName: 1
        })
        .sort({
            _id: -1
        })
        // skip({})
        // .limit(2)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            return next(err)
        })
})


// get single user details
router.get("/userDetails/:user_id", function (req, res, next) {
    // var searchCondition = {
    //     _id:req.params.user_id
    // }
    // UserModel
    //     .findOne(searchCondition, {})
    UserModel.findById(req.params.user_id)
        .then(user => {
            if (!user) {
                return next({
                    msg: "user not found",
                    status: 400
                })
            }
            res.json(user)
        })
        .catch(err => {
            return next(err)
        })
})


// router.post("/add", function(req, res, next){
//     res.json({
//         msg:"from create of user"
//     })
// })



router.put("/update/:user_id", function (req, res, next) {
    // res.json({
    //     msg: "from update of user"
    // })
    const updateUser = UserModel.findOne({
        _id:req.params.user_id
    })
    .then (user =>{
        if(!user){
            return next ({
                msg:"user not found",
                status: 400
            })
        }
        map_user_request(req.body, user)
        user.save()
        .then(upadtedUser =>{
            res.json(upadtedUser)
        })
    })
    .catch(err =>{
        return next(err)
    })

})



router.delete("/delete/:user_id", function (req, res, next) {
    // res.json({
    //     msg: "from delete of user"
    // })   

    // var searchCondition = {}
    UserModel.findByIdAndDelete(req.params.user_id)
        .then(user => {
            if (!user) {
                return next({
                    msg: "user not found",
                    status: 400
                })
            }
            res.json({
                msg: "user not found",
                status: 400
            })
            //     user.remove()
            //         .then((user) => {

            //             res.json({
            //                 msg: "user deleted successfully",
            //                 status: 200
            //             })
            //         })
            //         .catch(err => {
            //             console.log('failure in user remove')
            //             return next(err)
            //         })

        })
        .catch(err => {
            return next(err)
        })
})

module.exports = router;
