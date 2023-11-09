require('dotenv').config();

// importing core stuffs
const express = require('express');
const mongoose = require('mongoose');

// import custom routes
const authRoutes = require('./routes/authRoutes');


const app = express();

// settings
app.set('view engine','ejs')
app.set('views','templates');
app.use(express.static('public'))

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Connected Successfuly");
    app.listen(process.env.PORT,()=>{
        console.log("LISTENING . . . ");
    })
})
.catch(err=>{
    console.log(err);
})

app.get('/',(req,res)=>{
    res.status(200).render('home',{title: "Home"})
})

app.get('/blogs',(req,res)=>{
    res.status(200).render('blogs',{title:"Blogs"});
})

app.use(authRoutes);