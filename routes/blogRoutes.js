const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

/**
 * Route: '/all'
 * GET: This type of request will return all the blogs available
 */
router.route('/all')
    .get(blogController.getAllBlogs);

/**
 * Route: '/byId/:blogId'
 * GET: This type of request will a single blog based on id
 */
router.route('/byId/:blogId')
    .get(blogController.getBlogById);

/**
 * Route: '/byTopics/:topic'
 * GET: This type of request will a single blog based on id
 */
router.route('/byTopic/:topic')
    .get(blogController.getBlogsByTopic);

/**
 * Route: 'topics'
 * Get: This type of request will return all the topics available in db
 */
router.route('/topics')
    .get(blogController.getAllTopics);

router.route('/favourite')
    .get(blogController.getFavouriteBlogs);

/**
 * Route: '/create'
 * POST: This type of request will create a blog in DB and return the created blog
 */
router.route('/create')
    .post(blogController.createBlog);

module.exports = router;