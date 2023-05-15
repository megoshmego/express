can you please evaluate the following transcript for important terms, ideas , and give a simple demonstration of the concepts for review?




0:00
(lighthearted music)
0:04
- [Instructor] Next up,
0:05
we're going to talk about middleware and Express,
0:07
a very essential concept to working with Express,
0:10
especially as you start to write
0:12
more complicated applications.
0:13
So what is middleware?
0:15
Well, Express gives us a way of running code
0:17
in the middle of the request and response cycle.
0:21
So, somewhere between the time
0:22
when a request comes into our server,
0:25
and the time when we respond back with something,
0:28
we can run code that we would call middleware.
0:31
Middleware are just functions in Express.
0:33
So we write a function,
0:34
and it has access to the request object
0:37
and the response object.
0:38
And something we've seen before,
0:41
a function that we usually call, next.
0:43
So to define middleware,
0:45
we write a function with these three parameters,
0:47
request, response, and then next.
0:50
So we've seen middleware before.
0:52
One example is Express.JSON, right here.
0:56
This is a function, we didn't write it,
0:58
it comes with Express.
0:59
But in this function, for every single incoming request,
1:03
it's running, and it is parsing the request body as JSON,
1:07
if there is any data in there.
1:09
And then it adds it on to the request object,
1:11
and then it calls the next function.
1:14
It doesn't block our code, it moves on.
1:16
This isn't the end of the line.
1:18
This runs before every route that we have defined.
1:21
Another example of middleware,
1:23
are the 404, and global error handlers that we've set up.
1:27
So here we go.
1:28
This right here, this right here.
1:30
These don't run every single request,
1:32
but they run in between the requests coming in,
1:35
and the response going out.
1:37
And it just depends whether we have an error or not,
1:40
these may or may not run.
1:41
Versus, Express.JSON, that middleware runs every single time
1:45
any request comes in.
1:47
So we can define our own middleware,
1:49
and they can do a lot for us.
1:51
For example,
1:52
we can separate logic that we're duplicating
1:54
across lots of routes.
1:56
We don't really have many routes at the moment.
1:58
But commonly will have routes that are authenticated.
2:01
A user must be logged in,
2:02
in order to access one of these routes,
2:05
or five of these routes.
2:06
And we could write the logic in here,
2:08
to actually authenticate the user
2:10
and make sure that there is a current user.
2:13
Or we could move it into a middleware function
2:16
that we could then use in these different routes.
2:19
So we'll see how to do that specifically
2:21
when we get to authentication.
2:22
But we'll do a kind of watered down version right now.
2:26
Other things we can do with middleware, set up a logger.
2:29
If we wanted to log useful information
2:31
about each request that comes in,
2:34
we could do that, we will.
2:35
Adding a current user,
2:37
ensuring that users are authenticated,
2:39
ensuring that a user is authorized to do something,
2:42
or also just reducing duplication.
2:44
If you have code that you are rewriting
2:46
between a lot of different route handlers,
2:48
you can move it into its own middleware
2:50
that you can then use on specific routes.
2:54
So what does a middleware look like?
2:55
Well, I'm saying to put it in a separate file,
2:58
but we're gonna start just doing it in the same file,
3:00
and then we'll move it into a separate file.
3:02
And it's just a function with three parameters,
3:05
request, response, and next.
3:08
And as we saw before, a couple videos ago,
3:11
before your first exercise on Express,
3:13
this next parameter is really important.
3:16
It's what allows Express to move on to the next thing,
3:19
whether it's a route that matches or an error handler.
3:22
Next is essential.
3:24
If we don't call next, then this code will run,
3:27
and nothing else will run.
3:29
So this is a logger function.
3:31
Right now it's not doing anything in Express,
3:34
it just lives on its own.
3:35
We would have to tell express to use this logger function.
3:39
But why don't we just duplicate
3:40
this over in our application?
3:43
Right there, we have a logger function,
3:45
we'll move it into a separate file.
3:46
Eventually, all that it does is whatever
3:49
this incoming request object is,
3:52
it prints out the request method and request.path.
3:56
So the string of a path that's been requested,
3:59
/users/dogs.
4:01
And I think I'm gonna change this,
4:02
how about received A,
4:04
and then this will be post or get,
4:06
or delete or patch or put request, to request.path.
4:10
Okay.
4:11
So this is our logger, but it's not being used in any way.
4:14
In order to tell Express,
4:15
we want this to run on every single incoming request,
4:19
app.use,
4:20
just like we did for Express.JSON.
4:23
So we can do app.use,
4:26
and then we can pass in logger.
4:29
We could also just define this function in line here.
4:31
But there we go.
4:32
App.use this logger function.
4:34
And as we've seen, app.use is a way of telling Express,
4:37
here's some code I want you to run on every request.
4:41
Now because we have it up top,
4:42
it will run for every single request
4:44
because the request response cycle
4:46
will never be terminated by the time we get here.
4:49
Unlike let's say this 404 handler,
4:52
this follows the same pattern.
4:53
App.use, and then we have a callback in here.
4:57
We're never calling next but the point
4:59
is that this is not going to run for every request,
5:01
because one of our routes might be matched.
5:04
And if that's the case,
5:05
the cycle ends because we're responding.
5:07
We have a res.JSON or res.send.
5:10
So the placement of this middleware is important.
5:13
If we want to log every incoming request,
5:16
we'll put it above any of our routes.
5:18
All right, let's see what happens.
5:20
So here's my terminal.
5:22
And I'll go to some route that we recognize,
5:25
like users/1, I hit Enter.
5:29
Over here, okay, I'm getting some weird output,
5:32
but you will see that received a get request to/users/1
5:36
is printing out.
5:38
This favicon.ico thing we'll talk about in a moment,
5:41
if I go to users/2,
5:43
there we go.
5:45
Right here received a get request to users/2.
5:47
If I go to just users,
5:49
which is also a route we have,
5:51
we get received a get requests to/users.
5:54
And if I just go to some other URL,
5:56
we won't get a response right away.
5:58
But we do see received to get requests blah, blah, blah.
6:01
Also, if I use Insomnia to send a post request,
6:05
let's say to/parrotface, and I'll do a post,
6:11
send, we won't get a response.
6:13
But it does make it to our server,
6:15
and we are logging,
6:16
received a post request to/parrot face.
6:19
So now let's talk about this favicon.ico thing.
6:23
Every time I have a request coming in from my browser,
6:25
like this one right here, user/1, that's being logged.
6:29
But then we're getting
6:30
received a get request to favicon.ico.
6:34
A favicon is something that a browser automatically asks for
6:38
if you've never heard of that concept before.
6:40
A favicon is something that the browser asked for
6:43
on a request.
6:44
And the favicon is a tiny little icon.
6:47
I think it actually originally stands for favorites icon,
6:49
or favorite icon.
6:50
If I go to MDN, can see the favicon for MDN right here.
6:54
So it's a little icon that websites
6:56
usually respond with or they have an endpoint
6:59
that the browser can automatically ask for.
7:01
Right now we don't have one,
7:03
and the browser doesn't lose its mind if it doesn't get one.
7:06
But because we're logging every single request,
7:09
we do see it printed out here.
7:11
So if we wanted to just ignore that very quickly,
7:15
we could just write a route for it.
7:17
So, app.gets/, and then favicon.ico,
7:22
I-C-O.
7:24
And we'll just do a simple arrow function,
7:29
rec, res,.
7:30
And then we'll do a res.sendstatus,
7:33
which we haven't seen before.
7:34
So as far as I can recall,
7:36
it's a way of just sending back a status code,
7:38
and, nothing else.
7:39
The status code we'll use is 204, which means no content.
7:45
So instead of a 200, okay,
7:47
204 just means there's nothing here for you.
7:49
You definitely can set up your own favicon,
7:51
but I'm not gonna go through that at the moment.
7:53
So now if I request that same route,
7:55
we still see received a get request to favicon.ico,
7:58
but we're not getting this not found error,
8:01
which we were before,
8:02
because it was hitting this 404 handler,
8:04
which is returning this new Express error,
8:06
with 404 not found.
8:08
Anyway, at this point, it's not an issue.
8:11
The main focus should be the middleware.
8:12
So we defined this function,
8:14
request, response and next are the three parameters.
8:17
We do something, and then we call next.
8:19
If we don't call next, we just get stuck.
8:23
We will log every incoming request,
8:26
so if we take a look here, it's listening.
8:28
So all requests/hello, that is logged,
8:33
but then we don't get a response.
8:35
So we need to have that next.
8:39
So we could have just written this right here,
8:41
app.use logger, and just an anonymous function,
8:44
request, response, next.
8:46
And then written our logic in here,
8:49
kind of like what we did for the error handler
8:51
and for this 404 handler,
8:52
but it's nice to put them in a separate file,
8:55
your middleware, that is, for a couple reasons.
8:57
One, it just makes it simpler
8:59
and makes your file your app JS shorter,
9:02
but also, it's nice to give them a name,
9:04
so that we can reuse some of these functions.
9:06
And you'll see what I'm talking about in the next video.
9:09
For now, let's just take this logger,
9:11
that function right there, and move it into a new file.
9:15
I'll call it middleware.js,
9:18
paste that in.
9:20
And then I'll do a module.exports,
9:25
equals.
9:26
And I might have multiple middleware.
9:28
So I'm just gonna export an object
9:30
that includes that logger function as the key and the value.
9:34
So like that, just using the shortcut syntax.
9:37
Then I'm going to import my middleware.
9:39
So const, I'll give that object a name,
9:42
middleware, equals, require./middleware.
9:49
And then instead of logger, it's now middleware.logger.
9:54
Okay.
9:55
So again, app.use is telling Express,
9:57
use this function on every single incoming request.
10:01
Let's see what happens now.
10:03
So now if I hit users/1, there we go.
10:06
Get request to user slash one,
10:07
we see the favicon.ico, it's still printing out,
10:10
because of our logger.
10:11
It's not discriminating,
10:12
it's just any requests that comes in.
10:14
It is logging.
10:16
Users in general,
10:18
without the ID, received a get request to users.
10:21
So that is our first middleware,
10:23
maybe not the most useful one on Earth,
10:26
but it is something that is running in between
10:28
the requests coming in, and before the response goes out.
10:33
Now, if I hadn't put this at the beginning,
10:35
and I instead put this, let's say here,
10:39
what would happen is that we would be responding
10:42
with one of these routes potentially,
10:44
like if we ask for /users, or /users/1 or /2,
10:48
or whatever the ID is,
10:50
there's a response coming from those routes.
10:53
So that stops the cycle.
10:55
That stops Express in its tracks,
10:57
it doesn't use this middleware.
10:59
Just like these error handlers down here
11:01
don't run unless something went wrong
11:04
or a route was not matched above.
11:06
So we don't wanna put it down there.
11:08
We wanna put it up top somewhere before our routes,
11:10
if it's something we want to run for every single request.
11:13
Next, we'll see some more examples of middleware.
11:16
(lighthearted music)