const express = require('express');
const router = express.Router();
const BlogController = require("../controllers/BlogController");

// Get All Blogs
router.get('/', async (req, res) =>{
    const blogs = await BlogController.getAllBlogs();
    res.status(200).json(blogs)
})

// Search Blogs
router.get('/search', async (req, res) =>{
    const { keyword } = req.query;
    const blogs = await BlogController.searchBlogs(keyword);
    res.status(200).json(blogs)
})

// Get Blog by ID
router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    const blog = await BlogController.getBlogById(id);
    if(!blog){
        res.status(404).json({
            status: false,
            message: 'Blog not found',
        })
    }else{
        res.status(200).json({
            status: true,
            message: 'Blog found',
            data: blog
        })
    }
})

// Post new blog
router.post('/', async (req, res) =>{
    const blog = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        coverImage: req.body.coverImage,
    };
    const createBlog = await BlogController.createBlog(blog)
    
    if(!createBlog){
        res.status(500).json({
            status: false,
            message: 'Failed to create blog',
        })
    }else{
        res.status(201).json({
            status: true,
            message: 'Successfully created a new blog',
            data: createBlog
        })
    }
})

// Update blog by ID
router.put('/:id', async (req, res) =>{
    const blog = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        coverImage: req.body.coverImage,
    };
    const updateBlog = await BlogController.updateBlog(req.params.id, blog)

    if(!updateBlog){
        res.status(500).json({
            status: false,
            message: 'Failed to update blog',
        })
    }else{
        res.status(201).json({
            status: true,
            message: 'Successfully update blog',
            data: updateBlog
        })
    }
})

// Delete blog by ID
router.delete('/:id', async (req, res) =>{
    const { id } = req.params
    const deleteBlog = await BlogController.deleteBlog(id)
    if(!deleteBlog){
        res.status(500).json({
            status: false,
            message: 'Failed to delete blog',
        })
    }else{
        res.status(200).json({
            status: true,
            message: 'Successfully delete blog',
            data: deleteBlog
        })
    }
})

module.exports = router