const mongoose = require('mongoose');
const uuid = require('uuid');

const blogSchema = new mongoose.Schema({
    blogId: {
        type: String,
        default: () => uuid.v4()
    },
    title: {
        type: String,
        required: [true, 'A blog must have a title'],
        maxlength: [100, 'A blog\'s title should not be more then 100 characters long']
    },
    blogContent: {
        type: String,
        required: [true, 'Blog should have some text in it'],
        // minLength: [500, 'Blog should be of 500 characters or more'],
        trim: true
    },
    tags: [
        {
            type: String,
            trim: true
        }
    ],
    favourite: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;