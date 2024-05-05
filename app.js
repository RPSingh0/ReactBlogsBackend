const express = require('express')
const cors = require('cors');
const blogRouter = require('./routes/blogRoutes');
const globalErrorHandler = require('./utils/errorHandler');

/**
 * The main entrypoint `app` variable for application
 */
const app = express();

app.use(cors());

app.use(express.json())

app.use('/api/v1/blog', blogRouter);

app.use(globalErrorHandler);

module.exports = app;