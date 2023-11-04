require('dotenv').config();

const mongoose = require('mongoose');

const http = require('http');
const app = require('./app');

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Connected Successfuly");
    server.listen(process.env.PORT,()=>{
        console.log("LISTENING AT ",process.env.PORT);
    });
})
.catch(err=>{
    console.log(err);
})

