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

const corsOptions = {
    origin: function (origin, callback) {
        // Check if the request origin is in the allowed origins array
        if (process.env.CORS_ORIGIN.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

morgan.token('fullUrl', function (req) {
    return req.protocol + '://' + req.get('host') + req.originalUrl;
});

app.use(morgan(':method :fullUrl :status :res[content-length] - :response-time ms'))

app.use(express.json())

app.use('/api/v1/blog', blogRouter);

app.use(globalErrorHandler);

module.exports = app;