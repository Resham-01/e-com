const express = require("express")
const app = express()
const userRoute = require("./controller/user.controller")
const isAdmin = require("./middleware/isAdmin")
const morgan = require("morgan")
const authenticate = require("./middleware/authenticate")
const categoryRoute = require("./route/categoryRoute")
const productRoute = require("./route/productRoute")
const cors = require("cors")

const mongoose = require("mongoose")

require("dotenv").config()

const path = require("path")

const authroute = require("./controller/auth.controller")

// const port = 8000
const port = process.env.PORT || 5000

const dbURL = process.env.dbURL

// console.log("__dirname", __dirname)
// console.log("root directory", process.cwd())



mongoose.connect(dbURL)
    .then(() => {
        console.log("database connect successfully!!")
    })
    .catch((err) => {
        console.log(err)
    })

// third party middleware
app.use(morgan("dev"))

app.use(cors())

// json parser
app.use(express.json())

// x-www form url encoded
app.use(express.urlencoded({ extended: true }))


// express inbuilt middleware

// app.use(express.static("uploads"))  // pug, jade 

// app.use("/file", express.static("uploads"))
app.use("/file", express.static(path.join(process.cwd(), "uploads")))



app.use("/user", authenticate, userRoute)


app.use("/auth", authroute)

app.use("/category", categoryRoute)

app.use("/product", productRoute)
app.use("/uploads", express.static('images'))

app.use(function (req, res, next) {
    next({
        msg: "Page Not Found!!"
    })
})

// TODO: set status code
// error handaling middlaeware
app.use(function (err, req, res, next) {
    res.status(err.status || 400)
    res.json({
        msg: "from error handling middleware",
        err: err.msg || err,
        status: err.status || 400
    })
})

app.listen(port, (err, done) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("server listening at port: ", port)
    }
})





