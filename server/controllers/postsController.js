const Post = require('../models/post');

const fetchPosts = async (req, res) => {
    // Find all posts
    const posts = await Post.find();
    
    // Respond with the posts
    res.json({posts: posts});
};

const fetchPost = async (req, res) => {
    // Get the id off the url
    const postId = req.params.id;
    
    // Find the post with the id
    const post = await Post.findById(postId);

    // respond with the post
    res.json({post});
};

const createPost = async (req, res) => {
    // Get the data from the request
    const content = req.body.content;

    // Create a new post
    const post = await Post.create({
        content,   
    });
    
    // respond with the new post
    res.json({post});
};

const updatePost = async (req, res) => {
    // Get the id off the url
    const postId = req.params.id;

    // Get the data from the request
    const content = req.body.content;

    // Find and update the post
   await Post.findByIdAndUpdate(postId, {
        content,
    });    
    
    // Find the post again
    const post = await Post.findById(postId);
    
    // respond with the updated post
    res.json({post: post});
};

const deletePost = async (req, res) => {
    // Get the id off the url
    const postId = req.params.id;
    
    // Find and delete the post
    await Post.findByIdAndDelete(postId);
    
    // respond with a message 
    res.json({message: "Post deleted"});
};

module.exports = {
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
};