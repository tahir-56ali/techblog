const mongoose = require('mongoose');
const { cloudinary } = require('../cloudinary');
const Schema = mongoose.Schema;
const Comment = require('./comment');

const imageSchema = new Schema({
    url: String,
    filename: String
});

imageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
});

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    images: [imageSchema],
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
    if (post.images.length) {
        for (let image of post.images) {
            await cloudinary.uploader.destroy(image.filename);
        }
    }
    if (post.comments.length) {
        const res = await Comment.deleteMany({ _id: { $in: post.comments } });
        console.log(res);
    }
})

module.exports = mongoose.model('Post', postSchema);