const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const productSchema = mongoose.Schema({

    product_name: {
        type: String,
    },
    product_category: {
        type: ObjectId,
        ref: "category"
    },
    product_price: {
        type: Number
    },
    productColor: {
        type: String
    },
    mfg: {
        type: Date
    },
    expiryDate: {
        type: Date
    },
    product_description: {
        type: String
    },
    product_tag: {
        type: [String]
    },
    warrentyStatus: Boolean,
    warrentyPeriod: {
        type: String
    },
    product_model: String,
    product_img: [String],
    product_discount: {
        discountedItem: Boolean,
        discountedType: {
            type: String,
            enum: ["percentage", "quantity", "value"]
        },
        discountedValue:{
            type: String
        }
    },
    vendor: {
        type: ObjectId,
        ref: "user"
    }
    
}, { timestamps: true })

const productModel = mongoose.model("product", productSchema)
module.exports = productModel

