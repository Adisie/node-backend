const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const blogRouter = require('./api/routers/blog');

app.use('/blogs',blogRouter);

module.exports = app;