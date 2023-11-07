require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Connected Successfuly");
    server.listen(process.env.PORT,()=>{
        console.log("LISTENING . . . ");
    })
}).catch(err=>{
    console.log(err)
})