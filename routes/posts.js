const express = require('express');
const router = express.Router();
const { validatePost, isLoggedIn, isAuthor } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const posts = require('../controllers/posts');
const { storage } = require('../cloudinary');
const multer = require('multer');
// image upload on local machine
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/uploads/')
//     },
//     filename: function (req, file, cb) {
//     const ext = file.originalname.split('.').pop();
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
//     }
// });
const upload = multer({ storage })

// 1. get /posts - all posts
// 2. get /posts/new - new post form
// 3. post /posts - create post
// 4. get /posts/:id - show post
// 5. get /posts/:id/edit - edit post form
// 6. put /posts/:id - update post
// 7. delete /posts/:id - delete post

router.route('/')
    .get(catchAsync(posts.index))
    .post(isLoggedIn, upload.array('image', 2), validatePost, catchAsync(posts.createPost));

router.get('/new', isLoggedIn, posts.renderNewForm);

router.route('/:id')
    .get(catchAsync(posts.showPost))
    .put(isLoggedIn, isAuthor, upload.array('image', 2), validatePost, catchAsync(posts.updatePost))
    .delete(isLoggedIn, isAuthor, catchAsync(posts.deletePost));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(posts.renderEditForm));

module.exports = router;