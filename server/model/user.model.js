const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({

    userName: {
        type:String,
        // unique:true
    },

    // first_name: String,
    // last_name: {
    //     type: String,
        
    // },
    password: { // todo: hash password
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"]
    },
    phone: {
        type: Number
    },
    address: {
        temporaryAddress: [String],
        permanentAddress: String
    },
    DOB: {
        type: Date
    },
    role: {
        type: String,
        // 1. for user, 2. for Admin, 3. for SuperAdmin
        enum: ["user", "admin"],
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    // for single files
    // image: String 

    // for multiple files
    image: [String]

}, {timestamps: true})

const UserModel = mongoose.model("user", UserSchema)
module.exports = UserModel

