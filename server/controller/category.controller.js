const categoryModel = require("../model/category.model")

exports.AddCategory = async (req, res, next) => {
    var category = await categoryModel.findOne({
        category_name: req.body.category_name
    })
    if (!category) {
        var newCategory = new categoryModel()
        newCategory.category_name = req.body.category_name

        var saveCategory = await newCategory.save()
        if (!saveCategory) {
            return next({
                msg: "something went to wrong",
                status: 400
            })
        }
        res.json(saveCategory)
    }
    else {
        return next({
            msg: "Category already exist",
            status: 400
        })
    }
}



exports.viewCategory = async (req, res, next) => {
    var category = await categoryModel.find()
    if (!category) {
        return next({
            msg: "something went to wrong",
            status: 400
        })
    }
    if (category == null) {
        return next({
            msg: "empty category",
            status: 400
        })
    }
    res.json(category)
}

exports.categoryDetails = async (req, res, next) => {
    var category = await categoryModel.findById(req.params.category_id)
    if (!category) {
        return next({
            msg: "the category is not found",
            status: 400
        })
    }
    if (category == null) {
        return next({
            msg: "empty category",
            status: 400
        })
    }
    else {
        res.json(category)

    }
}


exports.updateCategory = async (req, res, next) => {
    var category = await categoryModel.findByIdAndUpdate(req.params.category_id, {
        category_name: req.body.category_name
    }, { new: true })
    res.json(category)

}


exports.deleteCategory = async (req, res, next) => {
    var category = await categoryModel.findByIdAndDelete(req.params.category_id)
    if (!category) {
        return next({
            msg: "something went to wrong",
            status: 400
        })
    }
    if (category == null) {
        return next({
            msg: "category already deleted",
            status: 400
        })
    }
    res.json({
        deleteCategory: category,
        msg: "category deleted successfully",
        status: 200
    })
}