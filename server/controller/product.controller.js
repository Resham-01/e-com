const productModel = require("../model/product.module")


function map_product_request(requestData, product) {
    // requestData = req.body
    if (requestData.product_name) {
        product.product_name = requestData.product_name
    }
    if (requestData.product_category) {
        product.product_category = requestData.product_category
    }
    if (requestData.product_price) {
        product.product_price = requestData.product_price
    }
    if (requestData.productColor) {
        product.productColor = requestData.productColor
    }
    if (requestData.mfg) {
        product.mfg = requestData.mfg
    }
    if (requestData.expiryDate) {
        product.expiryDate = requestData.expiryDate
    }
    if (requestData.product_description) {
        product.product_description = requestData.product_description
    }
    if (!product.product_discount) {
        product.product_discount = {}
    }
    if (requestData.discountedItem) {
        product.product_discount.discountedItem = requestData.discountedItem.split(",")
    }

    if (requestData.discountedType) {
        product.product_discount.discountedType = requestData.discountedType
    }
    if (requestData.discountedOffer) {
        product.product_discount.discountedOffer = requestData.discountedOffer
    }
    if (requestData.vendor) {
        product.vendor = requestData.vendor
    }
    if (requestData.product_img) {
        product.product_img = requestData.product_img
    }
    if (requestData.product_description) {
        product.product_description = requestData.product_description
    }
    
    return product;
}


exports.addProduct = async (req, res, next) => {
    if (req.fileTypeError) {
        return next({
            msg: "invalid file format",
            status: 400
        })
    }

    const newProduct = new productModel({})
    if (req.files) {
        req.body.product_img = req.files.map((item) => {
            return item.originalname;
        })
    }
    map_product_request(req.body, newProduct)
    newProduct.vendor = req.user._id

    newProduct.save()
        .then(product => {
            res.json(product)
        })
        .catch(err => {
            return next(err)
        })
}


exports.viewProduct = async (req, res, next) => {
    var product = await productModel.find()
    .populate("vendor",{
        userName:1,
        email:1
    })
    .populate("product_category", "category_name")
    if (!product) {
        return next({
            msg: "something went to wrong",
            status: 400
        })
    }
    if (product == null) {
        return next({
            msg: "empty product",
            status: 400
        })
    }
    
    res.json(product)
}

exports.productDetails = async (req, res, next) => {
    var product = await productModel.findById(req.params.product_id)
    if (!product) {
        return next({
            msg: "something went to wrong",
            status: 400
        })
    }
    if (product == null) {
        return next({
            msg: "empty product",
            status: 400
        })
    }
    res.json(product)
}


exports.updateProduct = (req, res, next) => {
    productModel.findByIdAndUpdate(req.params.product_id)
        .then(product => {
            if (!product) {
                return next({
                    msg: "product not found",
                    status: 400
                })
            }
            map_product_request(req.body, product)
            product.save()
                .then(updatedProduct => {
                    res.json(updatedProduct)
                })
                .catch(err => {
                    return next(err)
                })
        })
        .catch(err => {
            return next(err)
        })

}



// router.put("/update_product/:product_id", function (req, res, next) {
//     const updateProduct = productModel.findOne({
//         _id:req.params.product_id
//     })
//     .then (product =>{
//         if(!product){
//             return next ({
//                 msg:"product not found",
//                 status: 400
//             })
//         }
//         map_product_request(req.body, product)
//         product.save()
//         .then(updateProduct =>{
//             res.json(updateProduct)
//         })
//     })
//     .catch(err =>{
//         return next(err)
//     })

// })



exports.deleteProduct = async (req, res, next) => {
    var product = await productModel.findByIdAndDelete(req.params.product_id)
    if (!product) {
        return next({
            msg: "something went to wrong",
            status: 400
        })
    }
    if (product == null) {
        return next({
            msg: "product already deleted",
            status: 400
        })
    }
    res.json({
        deleteProduct: product,
        msg: "product deleted successfully",
        status: 200
    })
}
