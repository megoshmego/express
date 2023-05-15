The important terms and ideas from the transcript are as follows:

1. **Express**: It is a minimal, unopinionated, and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

2. **NPM (Node Package Manager)**: It is the package manager for the JavaScript programming language. It is the default package manager for the JavaScript runtime environment Node.js.

3. **Package.json**: It is a file present in any Node.js project and contains metadata about the project like project name, version, and list of its dependencies. 

4. **Node Modules**: It is the directory where NPM installs your dependencies.

5. **Server**: It is a software or hardware device that accepts and responds to requests made over a network.

6. **Port**: It is a communication endpoint at which a service or process listens for requests.

7. **Routes**: In the context of web development, a route is a URI (Uniform Resource Identifier) which a web application can respond to. 

8. **HTTP status codes**: They are standard response codes given by website servers on the internet. The codes help identify the cause of the problem when a web page or other resource does not load properly.

9. **Callback function**: A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

Now, demonstrating the concepts in simple terms:

1. **Express**: Think of it as a tool that helps you to create a website using Node.js. It simplifies many processes.

2. **NPM**: It's like a library where you can get various tools (packages) for your project.

3. **Package.json**: Consider it as a project's profile, which lists its details and the tools it needs.

4. **Node Modules**: It's the toolbox where all the tools (packages) you got from NPM are kept.

5. **Server**: It's like a shop that listens to and fulfills your requests. You ask for a product (make a request), and the shopkeeper (server) gives it to you (sends a response).

6. **Port**: It's like the specific counter number in a huge department store. You go to the specific counter (port) to get the specific category of product you want.

7. **Routes**: These are like the specific sections in a restaurant menu. Each section (route) gives you specific types of food (data).

8. **HTTP status codes**: They are like responses from a shopkeeper. If the shopkeeper says, "We don't have that item," it's like getting a 404 status code, meaning "Not Found."

9. **Callback function**: Imagine you are cooking based on a recipe. Some steps in the recipe might say, "Wait until the water is boiling before adding the pasta." The instruction to add the pasta is a callback that you use after the water has boiled.

Creating a server in Express involves these steps:
1. Install Express via NPM.
2. Create a new JavaScript file.
3. Import Express in that file.
4. Initialize Express and assign it to a variable (usually called "app").
5. Call the `listen` method on the "app" variable, providing a port number and a callback function. This starts the server on the given port.

Without defining any routes, any request to the server will result in a 404 error because the server doesn't know how to respond to the request. Routes will be defined in the next steps.