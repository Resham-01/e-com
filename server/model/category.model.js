const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    category_name:{
        type: String
    }

}, {timestamps: true})

const categoryModel = mongoose.model("category", categorySchema)
module.exports = categoryModel