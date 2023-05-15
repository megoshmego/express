The following are the key terms and concepts from the transcript:

1. **JSON API**: An API (Application Programming Interface) that uses JSON (JavaScript Object Notation) as the data format for exchanging information. JSON is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate.

2. **Express.js**: A fast, unopinionated, minimalist web framework for Node.js, used for building web applications and APIs.

3. **Res.send()**: This is a method in Express.js used to send HTTP responses. This method performs content-negotiation on the response type by checking the request’s headers. This means it can handle different types of responses (like HTML, JSON, etc.) based on what's being requested.

4. **Res.json()**: This is another method in Express.js used to send JSON responses. Unlike res.send(), res.json() will always send a response with the content type set to 'application/json'.

5. **HTTP Request Methods (GET, POST)**: HTTP verbs describe what action should be performed on the specified resource. 'GET' is used to retrieve data, while 'POST' is used to send data to a server to create/update a resource.

6. **Request and Response Objects**: In Express.js, the Request ("req") object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, etc. The Response ("res") object represents the HTTP response that an Express.js app sends when it gets an HTTP request.

7. **app.use()**: This is a method in Express.js used to mount middleware functions at a specific path; the middleware function is executed when the base of the requested path matches the path.

8. **Middleware**: In Express.js, middleware are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.

9. **RESTful conventions**: These are standard conventions for designing networked applications. They involve using HTTP methods (GET, POST, PUT, DELETE) in a specific way to provide a consistent approach to interacting with resources.

To demonstrate these concepts, let's set up a simple JSON API using Express.js:

```javascript
const express = require('express');
const app = express();

// To parse incoming requests with JSON payloads
app.use(express.json());

let candies = [
  { name: 'Snickers', quantity: 43, price: 1.50 },
  { name: 'Skittles', quantity: 26, price: 0.99 },
];

app.get('/candies', (req, res) => {
  res.json(candies); // Sends the candies array as a JSON response
});

app.post('/candies', (req, res) => {
  candies.push(req.body); // Adds a new candy to the candies array from the request body
  res.json(candies); // Sends the updated candies array as a JSON response
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

This script sets up a server that listens on port 3000 and has two routes: a GET route at '/candies' that sends all the candies as a JSON response, and a POST route at '/candies' that adds a new candy to the candies array from the request body and then sends the updated candies array as a JSON response.