const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment');

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

postSchema.post('findOneAndDelete', async (post) => {
    if (post.comments.length) {
        const res = await Comment.deleteMany({ _id: { $in: post.comments } });
        console.log(res);
    }
})

module.exports = mongoose.model('Post', postSchema);