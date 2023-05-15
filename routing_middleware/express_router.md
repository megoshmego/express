can you please evaluate the following transcript for important terms, ideas , and give a simple demonstration of the concepts for review?

0:00
(bright upbeat music)
0:04
- [Instructor] All right, welcome back.
0:06
Next step, we are focusing more on Express.
0:08
We're gonna talk about routing in more detail,
0:11
specifically how we can break up our routes
0:13
across different files
0:14
using something called the Express Router.
0:17
Then we'll talk more about Middleware,
0:19
which we briefly talked about previously,
0:21
a couple videos ago,
0:22
and we'll also talk about testing Express apps.
0:25
So let's begin with the Express Router.
0:28
At the moment we've been writing every single route
0:31
directly inside of whatever our main Express file is app.js,
0:35
in this case I don't really have any routes
0:37
but if I did, I would have them all listed here in this line
0:41
or in this file before the app.listen line at the end.
0:45
And that works for smaller apps
0:47
but if we're building restful APIs
0:49
and we have multiple resources,
0:51
let's say we have five or six routes for,
0:55
I don't know /users and then another five routes
0:58
for /todos and /posts and /comments
1:02
and I don't know what else, maybe tags, categories
1:05
all of a sudden this one file is super cluttered.
1:08
This looks like four routes
1:09
but remember in reality, we have get /users,
1:14
then we would have get /users with an ID,
1:18
and then we might have a post /users to make a new user,
1:22
then we would have a delete /users / ID
1:26
you can see where I'm going here.
1:28
And if we follow that convention
1:29
that pattern for all of these different resources
1:32
all of a sudden our app.js is crazy crowded.
1:35
So that's where Express Router comes in.
1:38
It allows us to move our routes into different files.
1:41
We can have a user route file, a todos route file,
1:45
what else do we have?
1:46
Comments routes file
1:47
or we can just have a separate routes.js file
1:51
but we can still use them within app.js.
1:54
So if you wanted to do this,
1:55
you make a new file something.js,
1:58
ideally put something routes in the file name
2:01
so you know it's a routing file,
2:02
and we need to start by importing Express at the top.
2:05
Now we're not going to start an Express server in here
2:08
we're not even using, we're not executing Express
2:11
and saving it to an app variable.
2:13
All that we need to Express for is this one line right here,
2:17
new express.Router.
2:20
So let's go through this process.
2:22
At the moment I have a new file and a new folder,
2:25
it's just called VideoCode.
2:27
I have my app.js with my basic Express code,
2:30
so I require Express.
2:32
I also have this ExpressError class
2:34
that we spent so much time on so I can handle errors.
2:38
I am using json, I've gotten my 404 handler
2:42
and my generic error handler
2:43
and then I'm starting the server, but currently no reps.
2:47
So I'm gonna make a new file
2:48
and I'll just do, maybe I won't just do generic routes.
2:53
Let's do userRoutes.js,
2:57
(keyboard clanks)
2:58
and then in here we need to require Express
3:01
which by the way I actually don't have in this directory.
3:04
So I'm gonna do an npm in it, npm i express
3:12
and while that's going, I will import Express or require it.
3:16
Const express equals require express,
3:22
and now I'll make my router,
3:24
const router equals new express.router just like that.
3:29
So now I have this object called router
3:32
that I can define my routes on.
3:34
So I can do router.get/whatever
3:37
and add my callback and everything
3:39
and then at the end,
3:40
I can set module.exports to be router.
3:45
And then within my app.js I can import this router
3:49
and then tell my app to use it.
3:51
So this is the trick, it's the magic that connects this file
3:55
to my actual Express app over here.
3:58
So let's define a couple of routes.
4:00
Now, what's really nice about using Express Router
4:03
is that I can actually define a bunch of routes
4:05
in this file and then prefix them
4:08
with a different path in front
4:10
when I actually add them to my app.
4:13
So to show you what I mean, let's take a look at the slides.
4:15
These are routes for users
4:17
but notice that the path is simply / and /ID.
4:22
But then when I actually use this router,
4:25
when I add those routes to my main app,
4:27
I can prefix it with /users.
4:30
So that means that this route here would be /users
4:33
and this would be /users /ID.
4:37
So if we wanted to follow that pattern
4:38
which we don't have to but if we're doing user routes.js
4:42
all of our routes are going to start with /users.
4:45
I can simplify that by just writing /
4:48
and then prefixing everything with users
4:50
when I actually add my routes into my app.
4:54
So let's do a router.get /requests, response,
5:00
now I don't have a database, we'll do what we've been doing.
5:03
Let's make a users array.
5:05
Let's put one user in there with a username
5:08
of Hummingbird123 all right.
5:14
And then in my /users which right now is just /
5:19
in this route handler and the call back,
5:21
I will do a res.json
5:24
and we'll say users is equal to the users array.
5:29
So let's start with that one route
5:30
and then let's get it all working in our app js.
5:34
So I have module.exports equals router
5:36
all I need to do is in my app js file
5:39
I need to import those routes or that router.
5:42
So const userRoutes equals require
5:47
and then this needs to be ./userRoutes,
5:52
that's the name of my file.
5:54
And then the fancy thing that I can do is app.use
5:59
and then I can pass in a prefixed string, like /users
6:03
and then after that I just pass in my routes.
6:06
So the contents of that file
6:07
that we exported and required, so userRoutes.
6:13
Okay, so let's see what happens when I start my server up.
6:17
nodemon app.js, oh looks like I made a mistake,
6:23
this is capital R, I had this as lowercase,
6:26
that should be uppercase.
6:27
Now let's go to localhost3000/users, and it works.
6:34
We're getting our information from that one route
6:37
that we defined back here, as /
6:40
but because we added it into our app with this app.use
6:44
and we prefixed every route in that file with /users,
6:48
I can go to /users and view that route,
6:51
I can also have /api/users,
6:54
now all of those routes will start with api/users.
6:59
So now let's add one more route
7:00
into users routes, or user routes.
7:03
Let's do a router.get with an ID.
7:06
So /ID as a variable request response
7:12
and I guess we don't really have IDs at the moment.
7:15
Let's just add a hard coded ID of one,
7:18
maybe I'll add one more user in here.
7:22
So let's do an ID of two and username will be RavenMan.
7:29
Okay, so we'll take this ID, which is request.params.id
7:36
and then we'll find the corresponding user in this array.
7:40
So let's do const user equals users.find
7:46
and then for each user, for that user that we're looking at,
7:50
we wanna find where user.id equals request.params.ID.
7:56
However request.params.ID is going to be a string
8:00
so one easy way to turn that into a number
8:02
is with that Plus sign right there.
8:04
If you haven't seen that unary operator,
8:06
you could also convert it into a string
8:08
you could also do double equals, I guess.
8:11
Anyway, let's take that user, we'll just assume
8:13
that we found a user,
8:15
I guess we could use our error handling
8:17
that we've already created
8:19
but just to keep things concise here,
8:21
we will just respond with json, res.json with that user
8:26
which is the same as doing that right there.
8:29
Okay, so now I should be able to go to api/user/one
8:34
and there we go.
8:35
User colon ID is one username Hummingbird123.
8:40
If I go to two now again we don't have the error handling
8:43
so is I go to three we just get an empty json response.
8:46
But now we have two different routes in our file
8:48
that we can define first of all separated individually
8:52
away from app.js which is nice.
8:55
We could a userRoutes file, we could commentsRoutes
8:58
and postsRoutes, and todoRoutes and whatever routes,
9:01
but we also are able to simplify
9:03
the path names that we write here.
9:05
So not everything has to start with /users.
9:07
This is nice for a couple of reasons,
9:09
one it's shorter, that's always great
9:11
but two it makes it easier if we wanna change
9:14
any of the route prefixes at any point in the future.
9:17
If I decide, oh actually this should be v2/users
9:21
I have to change it in just one place and that's it.
9:24
So it's pretty nice to be able to do that,
9:26
I'll just go with /users though
9:28
and that's pretty much it for Express Router.
9:31
So anytime you wanna make some new routes
9:33
and you want them to be in their own file
9:36
new express.Router, save that to a variable
9:39
and then the exact same syntax we've been using
9:41
except instead of app.get it is router.get,
9:45
router.post, router.delete and then export that
9:49
require the router from some file
9:52
and then tell your app to use those routes
9:55
and provide a prefix.
9:57
(bright upbeat music)