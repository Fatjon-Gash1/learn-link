const express = require('express');
const router = express.Router();
const postController = require('../controllers/Posts.controller');

// Route for fetching all posts
router.get('/', postController.fetchPosts);

// Route for fetching a specific post by ID
router.get('/:id', postController.fetchPost);

// Route for creating a new post
router.post('/', postController.createPost);

// Route for updating an existing post by ID
router.put('/:id', postController.updatePost);

// Route for deleting a post by ID
router.delete('/:id', postController.deletePost);

module.exports = router;