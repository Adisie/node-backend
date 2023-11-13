require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookie_parser = require('cookie-parser')

// routes
const blogs = require('./routes/blogs')
const users = require('./routes/users')

const {
    authRequired
} = require('./middleware/auth-required')

const app = express()


// midellware
app.use(express.json())
app.use(cookie_parser())

// connecting to the database
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("CONNECTED")
    app.listen(process.env.PORT,()=>{
        console.log("LISTENING . . . ")
    })
})
.catch(err=>{
    console.log(err)
})

app.use('/users',users)
app.use('/blogs',authRequired,blogs)


