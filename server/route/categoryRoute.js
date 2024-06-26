const router = require("express").Router()
const {AddCategory, viewCategory, categoryDetails, updateCategory, deleteCategory} = require("../controller/category.controller")


router.post("/add_category", AddCategory)
router.get("/view_category", viewCategory)
router.get("/category_details/:category_id", categoryDetails)
router.put("/update_category/:category_id", updateCategory)
router.delete("/delete_category/:category_id", deleteCategory)

module.exports = router