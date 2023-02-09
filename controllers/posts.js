const Post = require('../models/post');

module.exports.index = async (req, res) => {
    const posts = await Post.find({});
    res.render('posts/index', { posts });
}

module.exports.createPost = async (req, res) => {
    const post = new Post(req.body.post);
    //post.author = req.user._id;
    await post.save();
    req.flash('success', 'Post has been created successfully!');
    res.redirect('/posts');
}

module.exports.showPost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.render('posts/show', { post });
}