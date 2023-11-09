require('dotenv').config();

// importing core stuffs
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// import custom routes
const authRoutes = require('./routes/authRoutes');
const {authRequred,getUser} = require('./middleware/authRequired');


const app = express();

// settings
app.set('view engine','ejs')
app.set('views','templates');
app.use(express.static('public'))
app.use(cookieParser());
app.use(express.json());

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

app.get('*',getUser);

app.get('/',(req,res)=>{
    res.status(200).render('home',{title: "Home"})
})

app.get('/blogs',authRequred,(req,res)=>{
    res.status(200).render('blogs',{title:"Blogs"});
})

app.use(authRoutes);