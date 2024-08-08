/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - blogContent
 *         - tags
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the blog
 *         title:
 *           type: string
 *           description: The title of the blog
 *         blogContent:
 *           type: string
 *           description: The content of the blog
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *             description: Tags associated with the blog
 *         createdOn:
 *           type: string
 *           format: date-time
 *     BlogCreate:
 *       type: object
 *       required:
 *         - title
 *         - blogContent
 *         - tags
 *         - secreteKey
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the blog
 *         blogContent:
 *           type: string
 *           description: The content of the blog
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *             description: Tags associated with the blog
 *         secreteKey:
 *           type: array
 *           minItems: 2
 *           maxItems: 2
 *           items:
 *             type: string
 *             format: uuid
 *     Response:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status of request/response
 *         results:
 *           type: integer
 *           description: Number of results
 *         data:
 *           type: object
 *           properties:
 *             blogs:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *     ResponseSingleBlog:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status of request/response
 *         data:
 *           type: object
 *           properties:
 *             blogs:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *     ResponseBlogCreated:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status of request/response
 *         data:
 *           type: object
 *           properties:
 *             blog:
 *               type: object
 *               $ref: '#/components/schemas/Blog'
 *     ResponseBlogNotCreatedBadRequest:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status of request/response
 *         message:
 *           type: string
 *           description: Failure reason
 *     ResponseTags:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The status of request/response
 *         results:
 *           type: integer
 *           description: Number of results
 *         data:
 *           type: object
 *           properties:
 *             tags:
 *               type: array
 *               items:
 *                 tag:
 *                   type: string
 *                   description: a single tag
 */