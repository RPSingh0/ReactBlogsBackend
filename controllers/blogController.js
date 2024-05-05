const catchAsync = require('../utils/catchAsync');
const Blog = require('../models/blogModel');

/**
 * This function will return all the blogs find in the DB
 */
exports.getAllBlogs = catchAsync(async (req, res, next) => {
    let blogs;
    // if there are query fields to get selective data
    if (req.query.fields) {
        const {fields} = req.query;
        blogs = await Blog.find().select(fields.split(',').join(' ')).select('-_id blogId');
    } else {
        blogs = await Blog.find().select('blogId title blogContent tags createdOn -_id');
    }

    res.status(blogs.length !== 0 ? 200 : 204).json({
        status: 'success',
        results: blogs.length,
        data: {
            blogs: blogs
        }
    });
});

/**
 * This function will return a single blog by id
 */
exports.getBlogById = catchAsync(async (req, res, next) => {
    const blog = await Blog.find({blogId: req.params.blogId}).select('blogId title blogContent tags createdOn -_id');

    res.status(blog.length !== 0 ? 200 : 204).json({
        status: 'success',
        data: {
            blog: blog
        }
    });
});

/**
 * This function will return all the available tags
 */
exports.getAllTopics = catchAsync(async (req, res, next) => {
    const tags = await Blog.distinct('tags');

    res.status(tags.length !== 0 ? 200 : 204).json({
        status: 'success',
        results: tags.length,
        data: {
            tags: tags
        }
    });
})

/**
 * This function will return blogs filtered by topic
 */
exports.getBlogsByTopic = catchAsync(async (req, res, next) => {

    let blogs;
    // if there are query fields to get selective data
    if (req.query.fields) {
        const {fields} = req.query;
        blogs = await Blog.find({
            tags: {$in: [req.params.topic]}
        }).select(fields.split(',').join(' ')).select('-_id blogId');
    } else {
        blogs = await Blog.find({
            tags: {$in: [req.params.topic]}
        }).select('blogId title blogContent tags createdOn -_id');
    }

    res.status(blogs.length !== 0 ? 200 : 204).json({
        status: 'success',
        results: blogs.length,
        data: {
            blogs: blogs
        }
    })
});

/**
 * This function will return all the favourite blogs
 */
exports.getFavouriteBlogs = catchAsync(async (req, res, next) => {

    let blogs;
    // if there are query fields to get selective data
    if (req.query.fields) {
        const {fields} = req.query;
        blogs = await Blog.find({
            favourite: true
        }).select(fields.split(',').join(' ')).select('-_id blogId');
    } else {
        blogs = await Blog.find({
            favourite: true
        }).select('blogId title blogContent tags createdOn -_id');
    }
    
    res.status(blogs.length !== 0 ? 200 : 204).json({
        status: 'success',
        results: blogs.length,
        data: {
            blogs: blogs
        }
    })
})

/**
 * This function will create a blog and return the created blog
 */
exports.createBlog = catchAsync(async (req, res, next) => {

    const {title, blogContent, tags, favourite, secreteKey} = req.body;

    if (secreteKey?.length === 2 && secreteKey[0] === process.env.SECRETE_A && secreteKey[1] === process.env.SECRETE_B) {

        const blog = await Blog.create({
            title: title,
            blogContent: blogContent,
            tags: tags,
            favourite: favourite
        });

        const createdBlog = blog.toObject();
        delete createdBlog.__v;
        delete createdBlog._id;

        res.status(201).json({
            status: 'success',
            data: {
                blog: createdBlog
            }
        });
    } else {
        res.status(400).json({
            status: 'fail',
            message: 'Nice try :) but that doesn\'t work'
        });
    }
});