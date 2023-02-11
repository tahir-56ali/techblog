const mongoose = require('mongoose');
const { descriptors, places } = require('./seedHelpers');
const Post = require('../models/post');
const Comment = require('../models/comment');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/tech-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Post.deleteMany({});
    await Comment.deleteMany({});
    for (let i = 0; i < 100; i++) {
        const post = new Post({
            // YOUR USER ID
            author: '63e61ea48f6ab6d44b8a35e2',
            title: `${sample(descriptors)} ${sample(places)}`,
            post: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam consequatur voluptates ullam, repellat doloremque nesciunt aut id quidem exercitationem quos, accusantium aliquam tempore beatae quia eius porro placeat minima sapiente.',
            images: [
                {
                    url: 'https://res.cloudinary.com/dmhxssqb6/image/upload/v1676128991/TechBlog/gaz8g9ufzqnk5dqbs4gd.jpg',
                    filename: 'TechBlog/gaz8g9ufzqnk5dqbs4gd',
                },
                {
                    url: 'https://res.cloudinary.com/dmhxssqb6/image/upload/v1676128990/TechBlog/pa3rud9zqp7bu4sqx1nn.jpg',
                    filename: 'TechBlog/pa3rud9zqp7bu4sqx1nn',
                }
            ],
        })
        await post.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});