const express = require("express")
const authenticate=require("./authenticate")

const app = express()

const port = 8000

/*
module import and export
es5

import:
    => const variable = require ("module_name")

export:
    => module.exports = Data

exports.functionName = Data

const {functionName} = require("path")
*/


// handler

// 1. static handler
// app.get("/home", (request, response) => {
//     // method must be get
//     // route must be /home
//     // application level middleware 
//     response.send("welcome to express js")
// })


// app.use(function(req, res, next){
//     // application level middleware 
//     // regardless of any method and url this middleware came into action
//     // res.send("req-res cycle blocked at first middleware")
//     next()
// })


// configuration
// app.use(function(req, res, next){
//     // application level middleware 
//     // res.send("second middleware")
//     next()
// })




// app.use(function(req, res, next){
//     // regardless of any method and url this middleware came into action
//     // res.send("req-res cycle blocked at first middleware")
//     req.name= "Resham"
//     next()
// })

// // mathi ko resham lai tala ko my name is le replace gareko (yuta middleware ko data lai arko middleware maa change gareko)
// app.use(function(req, res, next){
    
//     req.name = "my name is resham"
//     res.json({
//         propsData: req.name
//     })
// })



/*

**********--Another way to write function--**************

function check (req, res, next){
    next()
}

function validData(req, res, next) {
    next()
}
app.use(check, validData)

app.use(function(req, res, next){
    next()
}, function(req, res, next){
    next()
})

*/



// app.get("/contact", (request, response) => {
//     // specific method
//     // specific endpoint(method and url)
//     response.send("contact Page")
// })

// app.get("/contact/:phone", (request, response) => {
//     response.json({

//         // json = javaScript object nottion
//         /*
//         {
//             "name": "Resham",
//             "location": "Surkhet"
//         }
//         */
//         phone: request.params,   // url maa jane dynamic value params maa janxa 
//         phone: request.params.phone,
//         queryData: request.query,
//         abc: request.query.searchQuary
//     })
// })

// app.get("/gallery", (request, response) => {
//     response.send("Gallery Page")
// })

// app.get("/gallery/picture/:first_picture", (request, response) => {
//     response.json({
//         picture_first: request.params.first_picture
//     })
// })


// username => resham
// password => 123456
// app.get("/login", (request, response) => {

//     if (request.query.username == "resham" && request.query.password == "123456") {
//         response.send("login successfully!!!!!")
//     }   
//     else if (request.query.username == "resham" || request.query.password == "123456") {
//         if (request.query.username != "resham") {
//             response.send("username invalid!!!!")
//         }
//         else {
//             response.send("password invalid!!!!")
//         }  
//     }
//     else {
//         response.send("invalid both username and password!!!!")
//     }
   
   
//     response.json({
//         queryData: request.query
//     })
// })


// // 2. dynamic  handler
// app.get("/:dynamic_url", function (request, response) {
//     response.send("from dynamic url, Page not found")
// })

/*
middleware
=> middleware is a function which has access of http request object, http response object and next middleware function refrence
Types:
1. application level middleware
2. routing level middleware
3. inbuilt middleware
4. third party middleware
5. error handling middleware

Syntax:
functio0n (request, response, next) {

}
=> first argument or request is http request object
=> second argument or response is httpp response object
=> third argument or next is next middleware function reference

app.use()
app.use("/", middleware, ()=> {

})



CRUD 
c => create(POST)
r => read(GET)
u => update(PUT)
d =>delete(DELETE)



MVC
=> MODAL
=> VIEW
=> CONTROLLER
*/



/*
DATABASE:
    MERN

    1. Relational DBMS
        => table based design
        => row => tuple (ecah record inside a table)
        => non scalable
        => sql database (structure query language)
        => relation between table existes
        =>mysql, sql-lite, postgre.

    2. Distributed DBMS
        => collection
        => document => each record inside a collection is document
        => scalable
        => no sql (not only sql) database
        => relation doesn't exist between collection 
        => mongodb, redis, cosmos db
*/


// app.use("/view_product", authenticate, (req, res)=>{
//     res.json({
//         msg:"Add Product"
//     })
// })


app.listen(port, (err, done) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("server listening at port: ", port)
    }
})