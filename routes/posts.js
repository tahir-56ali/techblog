const express = require('express');
const router = express.Router();
const {validatePost} = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const Post = require('../models/post');
const posts = require('../controllers/posts');

// 1. get /posts - all posts
// 2. get /posts/new - new post form
// 3. post /posts - create post
// 4. get /posts/:id - show post
// 5. get /posts/:id/edit - edit post form
// 6. put /posts/:id - update post
// 7. delete /posts/:id - delete post

router.route('/')
    .get(catchAsync(posts.index))
    .post(validatePost, catchAsync(posts.createPost));

router.get('/new', (req, res) => {
    res.render('posts/new');
});

router.get('/:id', catchAsync(posts.showPost));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.render('posts/edit', { post });
}));

router.put('/:id', (req, res) => {
    res.send("update post");
});

router.delete('/:id', (req, res) => {
    res.send("delte post");
});

module.exports = router;