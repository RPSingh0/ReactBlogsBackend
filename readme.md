# React-Blogs Backend

This project is created using Node.js, Express, and MongoDB.

## Technologies Used

- **Node.js**: Node.js is a runtime environment that allows you to run JavaScript on the server-side. It's efficient for building scalable and high-performance applications.

- **Express**: Express.js is a web application framework for Node.js. It simplifies the process of building web applications and APIs by providing a robust set of features and middleware.

- **MongoDB**: MongoDB is a NoSQL database that uses a document-oriented data model. It's known for its flexibility, scalability, and ability to handle large volumes of data.

## Blog Schema

- **blogId**: String (default generated using uuid.v4())
- **title**: String (required, max length of 100 characters)
- **blogContent**: String (required, trimmed)
- **tags**: Array of Strings (trimmed)
- **favourite**: Boolean (default false)
- **createdOn**: Date (default current date/time)

## API Endpoints

All routes are under `/api/v1/blog`.

| Endpoint          | Method | Description                                 |
| ----------------- | ------ | ------------------------------------------- |
| `/all`            | GET    | Get all blogs                               |
| `/byId/:blogId`   | GET    | Get a single blog by ID                     |
| `/byTopic/:topic` | GET    | Get blogs by topic                          |
| `/topics`         | GET    | Get all topics available in the database    |
| `/favourite`      | GET    | Get favourite blogs                         |
| `/create`         | POST   | Create a blog in the database and return it |