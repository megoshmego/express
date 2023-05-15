Sure, let's break down the key ideas and important terms from the transcript:

1. **Accessing the request body**: In Express.js, you can access the data sent with the request using `request.body`. This data might come from a POST request or an AJAX request and usually comes in the form of JSON or form data.

2. **Parsing the request body**: In order to access the body of a request, Express.js needs to parse it. This is done using middleware functions such as `express.json()` and `express.urlencoded()`. 

3. **Setting up a POST request**: The instructor demonstrates setting up a POST request using `app.post()`. The route for this request is called 'register' and it is expected to receive a username and password. 

4. **Res.send()**: This method is used to send back a response. In the example, the data received in the request body is sent back in the response.

5. **express.json()**: This middleware function is used to parse incoming request bodies with a JSON payload. 

6. **express.urlencoded()**: This middleware function is used to parse incoming request bodies with a URL-encoded payload. The `{extended: true}` option allows for the parsing of complex objects.

7. **Testing the application**: The instructor uses an HTTP client called Insomnia to send requests to the application. They also use an HTML form to send a POST request.

Now, let's give a simple demonstration of these concepts:

```javascript
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    res.send(`Welcome, ${username}`);
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

In this application, we first import the Express.js library and create an Express application. We then tell the application to use the `express.json()` and `express.urlencoded()` middleware functions, which will parse incoming request bodies.

Next, we set up a POST route at '/register'. When a POST request is made to this route, Express will take the request body, parse it, and make it available in the `req.body` object. We then destructure the username and password from the request body and send a response back with a welcome message.

Finally, we tell the application to listen for connections on port 3000.