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
    if (requestData.product_model) {
        product.product_model = requestData.product_model
    }
    if (requestData.product_tag) {
        product.product_tag = requestData.product_tag.split(',')
    }
    if (requestData.warrentyStatus) {
        product.warrentyStatus = requestData.warrentyStatus
    }
    if (requestData.warrentyPeriod) {
        product.warrentyPeriod = requestData.warrentyPeriod
    }

    if (requestData.discountedItem || requestData.discountedType || requestData.discountedValue) {
        if (!product.product_discount) {
            product.product_discount = {}
        }
        if (requestData.discountedItem) {
            product.product_discount.discountedItem = requestData.discountedItem
        }

        if (requestData.discountedType) {
            product.product_discount.discountedType = requestData.discountedType
        }
        if (requestData.discountedValue) {
            product.product_discount.discountedValue = requestData.discountedValue
        }
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
            return item.filename;
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
        .populate("vendor", {
            userName: 1,
            email: 1
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
    productModel.findById(req.params.product_id)
        .then(product => {
            if (!product) {
                return next({
                    msg: "product not found",
                    status: 400
                })
            }
            product.vendor = req.user._id;
            map_product_request(req.body, product);
            console.log("update data: ", product)
            return product.save();
        })
        .then(() => {
            res.json({
                msg: "Product updated successfully",
            });
        })
        .catch(err => {
            return next(err)
        })
}


// exports.updateProduct = (req, res, next) => {
//     productModel.findByIdAndUpdate(req.params.product_id)
//         .then(product => {
//             if (!product) {
//                 return next({
//                     msg: "product not found",
//                     status: 400
//                 })
//             }
//             product.vendor = req.user._id
//             map_product_request(req.body, product)
//             product.save()
//                 .then(updatedProduct => {
//                     res.json(updatedProduct)
//                 })
//                 .catch(err => {
//                     return next(err)
//                 })
//         })
//         .catch(err => {
//             return next(err)
//         })
// }

// exports.updateProduct = (req, res, next) => {
//     productModel.findByIdAndUpdate(
//         req.params.product_id,
//         { 
//             ...req.body, 
//             vendor: req.user._id 
//         },
//         { new: true, runValidators: true } 
//     )
//     .then(updatedProduct => {
//         if (!updatedProduct) {
//             return next({
//                 msg: "Product not found",
//                 status: 400
//             });
//         }
//         res.json(updatedProduct);
//         console.log("updated product is: ", product)
//     })
//     .catch(err => {
//         return next(err);
//     });
// };




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


exports.searchProduct = async (req, res, next) => {
    var data = req.body;
    
    var searchCondition = {}

    map_product_request(req.body, searchCondition)
    if (data.minPrice) {
        searchCondition.product_price = {
            $gte: data.minPrice
        }
    }

    if (data.color) {
        searchCondition.productColor = data.color;
    }

    if (data.maxPrice) {
        searchCondition.product_price = {
            $lte: data.maxPrice
        }
    }

    if (data.minPrice && data.maxPrice) {
        searchCondition.product_price = {
            $gte: data.minPrice,
            $lte: data.maxPrice
        }
    }

    if (data.from_date) {
        var from_date = new Date(data.from_date).setHours(0, 0, 0, 0)
        searchCondition.createdAt = {
            $gte: from_date
        }
    }

    if (data.to_date) {
        var to_date = new Date(data.to_date).setHours(23, 59, 59, 59)
        searchCondition.createdAt = {
            $lte: to_date
        }
    }

    if (data.from_date && data.to_date) {
        var from_date = new Date(data.from_date).setHours(0, 0, 0, 0)
        var to_date = new Date(data.to_date).setHours(23, 59, 59, 59)
        searchCondition.createdAt = {
            $gte: from_date,
            $lte: to_date
        }
    }

    console.log("serach condition is: ", searchCondition)

    productModel
        .find(searchCondition)
        .populate("product_category")
        .then(product => {
            if (!product) {
                return next({
                    msg: "No any product matched your search condition",
                    status: 404
                })
            }
            res.json(product)
        })
        .catch(err => {
            return next(err)
        })
}