const {addProduct, deleteProduct, viewProduct, productDetails, updateProduct} = require("../controller/product.controller")
const upload = require("../middleware/uploader")
const authenticate = require("../middleware/authenticate")

const router = require("express").Router()
router.post("/add_product", upload.array("img"), authenticate, addProduct)
router.get("/view_product", viewProduct)
router.get("/product_details/:product_id", productDetails)
router.put("/update_product/:product_id", upload.array("img"), authenticate, updateProduct)
router.delete("/delete_product/:product_id", authenticate, deleteProduct)

module.exports = router