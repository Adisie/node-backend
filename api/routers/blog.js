const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// get all blogs
router.get('/',(req,res)=>{
    Blog.find()
    .then(blogs=>{
        res.json({blogs})
    })
    .catch(err=>{
        console.log(err);
    })
})

// adding new blog
router.post('/',(req,res)=>{
    const blog = new Blog({body: req.body.body});
    blog.save()
    .then(blog=>{
        res.json({blog});
    })
    .catch(err=>{
        console.log(err);
    })
})

// update a blog
router.put('/:id',(req,res)=>{
    Blog.updateOne({_id: req.params.id},{$set: {body: req.body.body}})
    .then(result=>{
        Blog.findById(req.params.id)
        .then(blog=>{
            res.json({blog})
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

router.delete('/:id',(req,res)=>{
    Blog.deleteOne({_id: req.params.id})
    .then(()=>{
        res.json({
            message: "Deleted Successfuly",
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router;