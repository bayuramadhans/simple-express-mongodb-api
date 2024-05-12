const BlogModel = require("../models/Blog");

exports.getAllBlogs = async () => {
    try {
        const blogs = await BlogModel.find();
        return blogs;
    } catch (error) {
        console.log(error);
        return false;
    }
};

exports.searchBlogs = async (keyword) => {
    try {
        const search = {
            $or: [
                { title: { $regex: String(keyword), $options: "i"}},
                { content: { $regex: String(keyword), $options: "i"}},
                { author: { $regex: String(keyword), $options: "i"}}
            ]
        }
        const blogs = await BlogModel.find(search);
        return blogs;
    } catch (error) {
        console.log(error);
        return false;
    }
};

exports.getBlogById = async (id) => {
    try{
        const blog = await BlogModel.findById(id);
        return blog;
    }catch (error) {
        console.log(error);
        return false;
    }
};

exports.createBlog = async (blog) => {
    try{
        const newBlog = await BlogModel.create(blog);
        return newBlog;
    }catch (error) {
        console.log(error);
        return false;
    }
}

exports.updateBlog = async (id, blog) => {
    try{
        const updatedBlog = await BlogModel.findByIdAndUpdate(id, blog);
        return updatedBlog;
    }catch (error) {
        console.log(error);
        return false;
    }
}

exports.deleteBlog = async (id) => {
    try{
        const deletedBlog = await BlogModel.findByIdAndDelete(id);
        return deletedBlog;
    }catch (error) {
        console.log(error);
        return false;
    }
}