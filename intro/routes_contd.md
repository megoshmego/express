

1. **Express Server**: The server created using Express.js, which listens for incoming HTTP requests.

2. **Routes**: In Express.js, routes determine how an application responds to a client request for a specific endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, etc.).

3. **app.listen**: A method that binds and listens for connections on the specified host and port. This is typically placed at the end of the Express.js code.

4. **Asynchronous Operation**: An operation that doesn't block other operations from executing until it finishes. Starting a server is an asynchronous operation.

5. **Route Handler**: The function(s) that is invoked when the route is matched. Express.js invokes the first matching route handler.

6. **HTTP Methods/Verbs**: The type of action the HTTP request intends to perform. This can be GET, POST, PUT, DELETE, etc.

7. **app.get, app.post, etc.**: These are methods provided by Express to handle specific types of HTTP requests (GET, POST, etc.) to a specific route.

8. **Request and Response Objects**: In every route handler, Express provides two objects: req (the request object) and res (the response object). The request object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on. Similarly, the response object represents the HTTP response that an Express app sends when it gets an HTTP request.

9. **Middleware**: Functions that have access to the request object, the response object, and the next function in the application’s request-response cycle.

Here's a simple demonstration of these concepts:

```javascript
// Importing Express
const express = require('express');

// Initializing Express
const app = express();

// Defining a GET route
app.get('/dogs', (req, res) => {
    res.send('Woof, woof, woof!');
});

// Defining a POST route
app.post('/chickens', (req, res) => {
    res.send('You created a new chicken (Not really though)');
});

// Starting the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

In this example, we have an Express server set up to listen on port 3000. We have defined two routes, '/dogs' and '/chickens'. When a GET request is made to '/dogs', the server responds with 'Woof, woof, woof!'. When a POST request is made to '/chickens', the server responds with 'You created a new chicken (Not really though)'. Note that in a real scenario, the POST route would be used to handle the creation of a new resource, like saving a new chicken to a database.