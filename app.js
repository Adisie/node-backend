const express = require('express');
const cors = require('cors');

const app = express();

// getting all routes
const blogs = require('./api/routes/blogs');

// middlewares
app.use(express.json());
app.use(cors());

// setting the routes
app.use('/blogs',blogs);


module.exports = app;