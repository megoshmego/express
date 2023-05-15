The transcript is primarily focused on error handling, middleware, and how Express.js works in the context of these two concepts. Here are the key terms, ideas, and concepts:

**1. Custom Error Class:** The instructor begins by discussing a custom error class, indicating that even though specific status codes (like 403) have been specified in the code, Express.js is still returning a 500 error, which is its default behavior. This leads to the need for custom error handling.

**2. Express.js Middleware:** Express.js middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application's request-response cycle. Middleware functions can perform tasks like executing code, making changes to the request and response objects, ending the request-response cycle, or calling the next middleware in the stack.

**3. app.use():** This is an Express.js method that is used to mount middleware functions at a specific path; the middleware function is executed when the base of the requested path matches the path. In this context, app.use() is used to apply middleware across all routes.

**4. Next():** This is a function in Express.js middleware that, when called, executes the middleware succeeding the current middleware.

**5. Route handlers:** These are specific responses by the server to certain routes (URLs).

**Demonstration of Concepts:**

Suppose we're building an Express.js application and we want to log a message for every request that our server receives. Here's how we can do that using middleware and the `app.use()` method:

```javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log("THE SERVER GOT A REQUEST!!!!");
    next(); // Move on to the next middleware/route
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

In this example, the `app.use()` function is called with a middleware function that logs a message and then calls `next()`. Because `next()` is called, Express.js knows to proceed to the next middleware or route handler in the stack, which in this case is the route handler for a GET request to the root URL ('/').

For custom error handling, you would define an error-handling middleware function and use `app.use()` to apply it to your application. An error-handling middleware function is defined in the same way as other middleware functions, except it takes four arguments instead of three: `(err, req, res, next)`. Here's a simple example:

```javascript
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Something broke!');
});
```

This middleware would log the error and send a 500 response whenever an error is passed to `next()`.