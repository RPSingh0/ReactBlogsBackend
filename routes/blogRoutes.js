const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Blog
 *  description: The blog managing API
 */
/**
 * @swagger
 * /blog/all:
 *   get:
 *     summary: Returns all blogs in the database
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: The list of all blogs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Response'
 *       204:
 *         description: No blogs found
 */
router.route('/all')
    .get(blogController.getAllBlogs);

/**
 * @swagger
 * /blog/byId/{blogId}:
 *   get:
 *     summary: Returns a blog by provided id
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Blog found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseSingleBlog'
 *       204:
 *         description: Blog not found
 */
router.route('/byId/:blogId')
    .get(blogController.getBlogById);

/**
 * @swagger
 * /blog/byTopic/{topic}:
 *   get:
 *     summary: Returns blogs by provided topic
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: topic
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all blogs found by topic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       204:
 *         description: Blog not found
 */
router.route('/byTopic/:topic')
    .get(blogController.getBlogsByTopic);

/**
 * @swagger
 * /blog/topics:
 *   get:
 *     summary: Returns list of topics available
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: List of all topics in DB
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseTags'
 *       204:
 *         description: No tags found
 */
router.route('/topics')
    .get(blogController.getAllTopics);
 
/**
 * @swagger
 * /blog/favourite:
 *   get:
 *     summary: Returns list of blogs favourite by admin
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: List of all favourite blogs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       204:
 *         description: No favourite blogs
 */
router.route('/favourite')
    .get(blogController.getFavouriteBlogs);

/**
 * @swagger
 * /blog/create:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogCreate'
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseBlogCreated'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseBlogNotCreatedBadRequest'
 */
router.route('/create')
    .post(blogController.createBlog);

module.exports = router;