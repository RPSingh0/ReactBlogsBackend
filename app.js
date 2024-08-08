const express = require('express')
const cors = require('cors');
const blogRouter = require('./routes/blogRoutes');
const globalErrorHandler = require('./utils/errorHandler');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const specs = require("./swaggerInit");

/**
 * The main entrypoint `app` variable for application
 */
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.json())

app.use('/api/v1/blog', blogRouter);

app.use(globalErrorHandler);

module.exports = app;