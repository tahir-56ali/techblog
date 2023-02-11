const { cloudinary } = require('../cloudinary');
const Post = require('../models/post');

module.exports.renderNewForm = (req, res) => {
    res.render('posts/new');
}

module.exports.index = async (req, res) => {
    const posts = await Post.find({}).populate('author');
    res.render('posts/index', { posts });
}

module.exports.createPost = async (req, res) => {
    const post = new Post(req.body.post);
    post.author = req.user._id;
    post.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    await post.save();
    req.flash('success', 'Post has been created successfully!');
    res.redirect('/posts');
}

module.exports.showPost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate('author').populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    });
    res.render('posts/show', { post });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.render('posts/edit', { post });
}

module.exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(id, { ...req.body.post }, { runValidators: true, new: true });
    const images = req.files.map(f => ({url: f.path, filename: f.filename}));
    updatedPost.images.push(...images);
    await updatedPost.save();
    const deleteImgs = req.body.deleteImages;
    if (deleteImgs) {
        for (let filename of deleteImgs) {
            await cloudinary.uploader.destroy(filename);
        }

        await updatedPost.updateOne({ $pull: { images: { filename: { $in: deleteImgs } } } });
    }
    req.flash('success', 'Post has been updated successfully!');
    res.redirect(`/posts/${id}`);
}

module.exports.deletePost = async (req, res) => {
    const {id} = req.params;
    await Post.findByIdAndDelete(id);
    req.flash('success', 'Post has been deleted successfully!');
    res.redirect('/posts');
}