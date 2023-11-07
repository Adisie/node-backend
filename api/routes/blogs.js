const express = require('express');
const blogs = express.Router();
const Blog = require('../models/blog');

// get all blogs
blogs.get('/',async (req,res)=>{
    const blogs = await Blog.find().sort({createdAt: -1})
    res.status(200).json({
        count: blogs.length,
        blogs,
    })
})

// post a new blog
blogs.post('/',async (req,res)=>{
    // get the body data from request body
    const {body} = req.body;

    // create the blog
    const blog = await Blog.create({body})
    res.status(200).json({blog});
})

//get a single blog
blogs.get('/:id',async (req,res)=>{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    res.status(200).json({blog});
})

// update a single blog
blogs.put('/:id',async (req,res)=>{
    const {id} = req.params;
    const {body} = req.body;
    await Blog.updateOne({_id: id},{$set: {body}});
    const blog = await Blog.findById(id);
    res.status(200).json({blog})

})

// delete a blog
blogs.delete('/:id',async (req,res)=>{
    const {id} = req.params;
    await Blog.deleteOne({_id: id});
    res.status(200).json({
        message: "DELETED SUCCESSFULY",
    })
})

module.exports = blogs;