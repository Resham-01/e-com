const multer = require("multer")

const path = require("path")

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "/uploads/images"))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})


const typeFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] !== "image") {
        req.fileTypeError = true;
        cb(null, false)
    }
    else {
        cb(null, true)
    }
}


const upload = multer({
    storage: Storage,
    fileFilter: typeFilter
})

module.exports = upload