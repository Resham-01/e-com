const router = require("express").Router()
const {AddCategory, viewCategory, categoryDetails, updateCategory, deleteCategory} = require("../controller/category.controller")
const authenticate = require("../middleware/authenticate")


router.post("/add_category",authenticate, AddCategory)
router.get("/view_category", viewCategory)
router.get("/category_details/:category_id", categoryDetails)
router.put("/update_category/:category_id",authenticate, updateCategory)
router.delete("/delete_category/:category_id",authenticate, deleteCategory)

module.exports = router