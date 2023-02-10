const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.addComment = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    const comment = req.body.comment;
    const newComment = new Comment({ comment });
    newComment.author = req.user._id;
    post.comments.push(newComment);
    await newComment.save();
    await post.save();
    req.flash('success', 'Comment has been added successfully!');
    res.redirect(`/posts/${id}`);
}

module.exports.deleteComment = async (req, res) => {
    const { id, commentId } = req.params;
    await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash('success', 'Comment has been deleted successfully!');
    res.redirect(`/posts/${id}`);
}