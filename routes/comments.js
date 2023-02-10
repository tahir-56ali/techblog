const express = require('express');
const Comment = require('../models/comment');
const comments = require('../controllers/comments');
const Post = require('../models/post');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isCommentAuthor, validateComment } = require('../middleware');
const router = express.Router();

router.post('/posts/:id/comments', isLoggedIn, validateComment, catchAsync(comments.addComment));

router.delete('/posts/:id/comments/:commentId', isLoggedIn, isCommentAuthor, catchAsync(comments.deleteComment));

module.exports = router;