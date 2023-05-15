The main ideas and concepts in the transcript include:

1. Express.js routes: Routes in Express.js allow different HTTP requests at different URLs to be handled in unique ways. They specify what functions should be run when a particular HTTP request is made to a specific URL.

2. Flask routes: The transcript mentions Flask, a Python-based web framework, and it's routing mechanism for comparison. Flask routes are similar to Express.js routes in that they define what code should be run when a specific HTTP request is made to a specific URL.

3. Request and Response Objects: Every time a route handler function is called in Express.js, it receives two objects: a Request object and a Response object. The Request object represents the HTTP request and contains data such as the query string, headers, etc. The Response object is used to format the data that will be sent back to the client in response to the HTTP request.

4. Route Handler Functions: These are the functions that are executed when a specific route is hit. They have access to the request and response objects.

5. app.get() Method: This method in Express.js is used to define what should happen when an HTTP GET request is made to a specific URL. 

6. res.send() Method: The send() method on the Response object is used to send back the response to the client. It automatically sets the Content-Type HTTP header depending on the type of data that is being sent back.

Let's demonstrate these concepts with a simple example:

```javascript
// import express
const express = require('express');

// initialize express app
const app = express();

// define a GET route for "/dogs"
app.get('/dogs', (req, res) => {
  console.log(req.headers); // log request headers
  res.send('<h1>Woof Woof!</h1>'); // respond with an HTML string
});

// start the server
app.listen(3000, () => console.log('Server listening on port 3000'));
```

In this example, when a GET request is made to the URL "/dogs", the console will log the request headers and the server will respond with the HTML string "<h1>Woof Woof!</h1>".