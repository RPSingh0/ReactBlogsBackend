# React-Blogs Backend

Swagger URL: [here](https://7xhegxas33.execute-api.us-east-1.amazonaws.com/prodv1/api-docs)

This project is created using Node.js, Express, and MongoDB.

## Technologies Used

1. **Node.js**: Node.js is a runtime environment that allows you to run JavaScript on the server-side. It's efficient
   for building scalable and high-performance applications.

2. **Express**: Express.js is a web application framework for Node.js. It simplifies the process of building web
   applications and APIs by providing a robust set of features and middleware.

3. **MongoDB**: MongoDB is a NoSQL database that uses a document-oriented data model. It's known for its flexibility,
   scalability, and ability to handle large volumes of data.

4. **AWS**: For hosting our backend

### How to prepare this for serverless lambda, api gateway and add swagger-ui support

* Install `serverless-http` with following command

    ```bash
    npm install serverless-http
    ```

* Now, head to server/index js file and export a handler function that will handle the request object in lambda

    ```js
    const serverless = require('serverless-http');
    
    module.exports.handler = serverless(app);
    
    // That's it... our application is ready for serverless deployment !
    // If you don't wish to include swagger ui, please head to deployment section skipping the next one
    ```

### Let's move to setup for swagger-ui

* Install `swagger-jsdoc`, `swagger-ui-express` with following command

    ```bash
    npm install swagger-jsdoc swagger-ui-express
    ```

* Now create a file in root directory to setup swagger ui configurations, in our case, let's name the file
  as `swaggerInit.js`
* Paste the following code in file

    ```js
    const swaggerJsDocs = require("swagger-jsdoc");
    
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Blogs API", // Provide your api title here
                version: "1.0.0",
                description: "A backend application for blogs", // A small description about the api
                contact: { // optionally provide the contact information here
                    name: "Rupinder Pal Singh",
                    url: "https://rpsr.in",
                    email: "rpalsingh715@gmail.com"
                }
            },
            servers: [
                {
                    url: process.env.SERVER_URL // The will be the server base url which will be preprended with all requests (can be hardcoded)
                }
            ]
        },
        apis: [ // The is an important key-value pair as it will let the configuration know where to look for the api endpoint's documentations
            "./routes/*.js"
        ]
    };
    
    const specs = swaggerJsDocs(options);
    module.exports = specs; // finally export the specs
    ```

* Once the initial configuration of swagger ui is done, let's go ahead and add the documentation for endpoints
* Move to your routes folder, pick any endpoint and add the following code there

  ```js
  /**
   * @swagger
   * /path/to/endpoint/{optionalParameter}:
   *   get:
   *     security: // add security if any
   *       - Authorization: []
   *     parameters: // provide path parameters if any
   *       - in: path
   *         name: optionalParameter
   *         required: true
   *         schema: // provide schema for path parameters
   *           type: string
   *           format: uuid
   *     summary: The endpoint is used to do this task
   *     tags: [Tag] // optionally add this endpoint under a tag (see next point after route)
   *     responses:
   *       200:
   *         description: Request success
   *         content:
   *           application/json:
   *             schema:
   *               <add schema here>
   *       500:
   *         description: Bad Credentials / Request
   *         content:
   *           application/json:
   *             schema:
   *               <add schema here>
   */
  router.route('<route>').get(<module>.<handlerFunction>);
  ```

* Optional - put the above route under a specific group (Tag). Place the below code to create a tag and add it
  above `tags` field
  ```js
  /**
  * @swagger
  * tags:
  *  name: TagName
  *  description: Basic description about Tag (group)
  */
  ```

  > To get more info on documenting other type of request POST, PUT, PATCH, DELETE etc... please
  > see: https://swagger.io/docs/open-source-tools/swagger-ui/usage/configuration/ and https://swagger.io/specification/

* Now as a final step, move to app.js and add following code for swagger ui

    ```js
    const swaggerUi = require('swagger-ui-express');
    const specs = require("./swaggerInit"); // this is the above config file, if you have another name, please require accordingly
    
    // first parameter tells about the endpoint at which swagger ui will be accessible (can be anything else 😊)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    ```

* That's it for swagger-ui too

### Now let's move to deployment on lambda

* Go to your aws console and select lambda
* Add function name and select environment
    * In our case, we'll select NodeJs(20.x) and x64 architecture
* Create function and wait for it to be done
* Once done, go to `Code` tab and from the dropdown on right side, select `Upload from` -> `.zip file`
* Include all the folders in project and zip it
* Upload that zip file to lambda and it's done!

### Now let's configure api gateway to execute this lambda when we receive a request

* Go to your aws console and select api gateway
* Click on create api and select `REST API` and click `Build`
* Add api name and click on `Create API`
* Once api is created, click on `Create resource` and add a resource
* Toggle `Proxy resource` to `On` and add `Resource name` as `{proxy+}`
* Optionally, select CORS and enable it (we enabled it in our case) and click `Create resource`
* Once resource is created, under `Methods`, click on `ANY` method type, this will be used to map requests to lambda
* You'll see a flow diagram on screen... On right end, you'll see `Undefined Integration`, click on `Edit Integration`
* Select Lambda function as integration type
* Toggle `Lambda proxy integration` to on
* Click save
* Once saved, click on `Deploy API`, and add stage name (optional)
* And, That's it... you'll have you're api gateway url
* Try going to <api-gateway-url>/api-docs to see the swagger ui 🥳 | *We used /api-docs as swagger ui endpoint, please
  replace it with your endpoint if used different*

### Some quick fixes

* In case you're facing some errors like (`Runtime.ImportModuleError`) below, this is likely because of incorrect
  handler configuration.
    ```json
    {
        "errorType": "Runtime.ImportModuleError",
        "errorMessage": "Error: Cannot find module 'index'\nRequire stack:\n- /var/runtime/index.mjs",
        "stack": [
            "Runtime.ImportModuleError: Error: Cannot find module 'index'",
            "Require stack:",
            "- /var/runtime/index.mjs",
            "    at _loadUserApp (file:///var/runtime/index.mjs:1087:17)",
            "    at async UserFunction.js.module.exports.load (file:///var/runtime/index.mjs:1119:21)",
            "    at async start (file:///var/runtime/index.mjs:1282:23)",
            "    at async file:///var/runtime/index.mjs:1288:1"
        ]
    }
    ```
    * Let's make sure we've got correct handler configured
    * Head to lambda -> Code tab -> Runtime Setting and click on `Edit`
    * Under the field, mention correct name, in our case our base file is called `server.js` so we
      defined `server.handler`. Please configure according to your base file

* In case you're trying to access this api from a frontend application and getting `CORS` error, this is likely because
  of unconfigured / mis-configured CORS properties
    * In our case, we enabled cors while creating resource in api gateway, if you forgot to do that, please
      follow [this](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors-console.html) documentation
    * If `CORS` in enabled, and still getting a `CORS` error, check nodejs application and make sure to use `cors`
      package like below
        * Install package
            ```bash
            npm install cors
            ```
        * Use cors middleware
          ```js
          const cors = require('cors');
            
          app.use(cors()); // Optionally add cors options
          ```
        * Get CORS option documentation [here](https://expressjs.com/en/resources/middleware/cors.html)