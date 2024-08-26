const mongoose = require('mongoose');
const dotenv = require('dotenv');
const serverless = require('serverless-http');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Dotevn will get access to the config.env.* file
 */
dotenv.config({
    path: `./config.env.${process.env.NODE_ENV}`,
});

/**
 * Initializing the root app here ->
 */
const app = require('./app');

/**
 * DB connection
 */
const DB = process.env.DATABASE_URL;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(c => {
    console.log('Connected to our DB!')
});

if (process.env.NODE_ENV === 'dev') {
    /**
     * Connection port settings
     */
    const port = process.env.PORT || 3000;

    /**
     * Listener on the port mentioned above
     */
    app.listen(port, '0.0.0.0', () => {
        console.log(`Application is running on port: ${port}...`);
    });
} else {
    module.exports.handler = serverless(app);
}