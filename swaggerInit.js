const swaggerJsDocs = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Blogs API",
            version: "1.0.0",
            description: "A backend application for blogs",
            contact: {
                name: "Rupinder Pal Singh",
                url: "https://rpsr.in",
                email: "rpalsingh715@gmail.com"
            }
        },
        servers: [
            {
                url: process.env.SERVER_URL
            }
        ]
    },
    apis: [
        "./routes/*.js"
    ]
};

const specs = swaggerJsDocs(options);
module.exports = specs;