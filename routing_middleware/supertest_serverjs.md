can you please evaluate the following transcript for important terms, ideas , and give a simple demonstration of the concepts for review?

0:00
(lighthearted music)
0:04
- [Instructor] Now we're gonna shift focus
0:05
to talk about testing our Express apps.
0:08
So how do we write integration tests
0:10
where we're testing that endpoints work,
0:12
that we can post some new data to an API
0:15
and that it's actually created or saved somewhere?
0:18
How do we test the status codes that we get back
0:20
from some endpoint?
0:22
To do this, we're going to use a tool called supertest.
0:25
And just as a recap,
0:26
we've been writing unit tests so far,
0:28
with jest testing a single function at a time,
0:30
a return value, passed in some input
0:32
we expect to get 10 back,
0:34
something like that simple unit tests.
0:37
Integration tests are usually the test
0:39
that different pieces of an application
0:41
are working together.
0:42
So in our case, testing an express route,
0:45
pass data in as part of a request,
0:47
do we get back what we expect,
0:49
the correct JSON, if we're writing a JSON API,
0:52
and this is super important
0:53
for all applications in all test coverage,
0:55
but especially when we're working with Express,
0:58
you know,
0:59
there's not a whole lot that we can write unit tests for,
1:01
at least not with the apps we have, at this point,
1:03
we don't have any real functions or complex logic
1:06
that we'd wanna test,
1:07
it's really more about testing how our routes work.
1:09
So these tests are a bit more involved
1:11
and we're going to use a tool to help us
1:13
called supertest.
1:15
So supertest is a library
1:17
that is actually not just for testing Express applications.
1:20
If you go to the docs here,
1:22
super test on GitHub,
1:24
there's a link in the notes.
1:25
And in the slides,
1:26
it's actually built on top of something called Super agent,
1:30
which is a node client for making HTTP requests.
1:33
So supertest allows us to make requests
1:36
or actually test requests with a server.
1:39
It doesn't have to be an express server.
1:41
But just as an example.
1:43
It gives us a function called request.
1:45
And we can call request .gets or .post,
1:48
.put patch, delete
1:50
and then we can test the contents we get back
1:53
we can have expectations,
1:54
we expect content type to be JSON,
1:56
we expect the data to be whatever, an array of cats.
2:01
So that's the goal here.
2:02
Supertest itself is not a testing framework,
2:05
it's a tool that we'll use in conjunction with Jest.
2:08
But you'll also see people use super tests with other tools
2:12
like Mocha,
2:13
another popular testing library,
2:15
it's pretty similar to what we saw in Flask
2:17
where we have a test client,
2:19
that test client made requests against our API
2:22
against our application
2:23
and then we can write expectations.
2:26
Okay, so we can install supertest.
2:29
Notice here that it's NPMI supertest,
2:32
NPM install super test,
2:34
I'm also adding this dash dash save dev,
2:37
this is a way of specifying that
2:39
supertest is a development dependency,
2:42
it doesn't need to be a dependency
2:44
for the entire application.
2:46
If someone just wants to run the app,
2:48
or for putting it up on GitHub,
2:49
our package .JSON can separate out development dependencies.
2:53
So things like test frameworks or testing libraries,
2:56
logging tools,
2:58
anything that you don't actually need
3:00
to make the app work, but that developers might want.
3:03
So we'll install this,
3:04
I have a new application that we'll be testing.
3:07
I'll walk through what it does in just a moment.
3:10
But it does have a package .JSON,
3:12
and at the moment, it just has express in there.
3:15
So I'm gonna hop over to my terminal, stop the server,
3:18
I'm in this new application
3:20
and I'll run NPMI dash dash save dev super test.
3:27
And when that finishes,
3:28
we'll take a look at our package.JSON.
3:30
And you'll see that it does list supertest as a dependency.
3:34
But it's not in the main dependencies property, I guess.
3:39
It's in devDependencies.
3:41
Okay, so now I'm gonna start this server up,
3:43
so I can just show you what it does.
3:45
It's a simple API for cats.
3:48
So if we look at app.js,
3:50
we've got all the standard stuff we've seen before
3:52
app.use, Express.JSON.
3:55
I'm using Express router to write my cat routes
3:58
in a separate file, which you can see right here.
4:01
So all of my cat routes will be prefixed with slash cats,
4:04
when I actually tell my app to use it,
4:07
I've got my error handling and app.listen.
4:10
So the cat routes are pretty standard restful routes,
4:13
we don't have a real database.
4:14
So I have a file called fakeDb,
4:17
which is literally just an array,
4:19
an empty array that we are exporting.
4:22
So when I import it over here,
4:23
I require fakeDb,
4:25
I just start out with an empty array.
4:27
So we have the slash route as a get request.
4:30
Remember, it's actually slash cats when I'm including it,
4:33
which jest sends a JSON response with the cats database,
4:37
the cats array
4:38
that we require.
4:39
I'm giving it the name of cats.
4:41
We have a post to slash cats,
4:44
which takes data from the body.
4:47
So request.body.name,
4:48
and then it pushes that on to the cats array
4:51
and then sends a created status to a one
4:53
and JSON back with that new cat that we just made.
4:57
There's a get route for slash cats slash name
5:00
as a variable, and then we try and find a cat
5:03
using that name.
5:03
And if we don't we throw an error.
5:05
Otherwise, we respond with the JSON for that new factor,
5:08
it's not new, but for that found cat.
5:11
We have a patch route
5:12
where you can update the name of a cat.
5:14
So a cat just has a name in this simple API.
5:17
But obviously, we could have a lot more in there.
5:19
But the point here is really to show you how to test
5:22
not how to write a fancy API,
5:23
we've already seen the basics.
5:25
So you could expand this API in a whole bunch of ways.
5:28
So we have a patch route to update a cat
5:30
based off of a name,
5:32
and a delete route to delete a cat based off of a name.
5:35
So cat slash name, cat slash name,
5:38
but different verbs patch versus delete.
5:41
So let's test it out.
5:43
In here, when I say test,
5:45
I mean, let's play around with it with Insomnia,
5:47
before we actually write our tests.
5:49
So in my app.js,
5:50
I'm importing dot slash routes slash cats,
5:54
using Express router once again, right here,
5:57
right there.
5:58
New express dot router.
6:00
And then that's kind of it,
6:02
starting the server up.
6:03
So I have it running over here
6:05
and if I send a request to localhost:3000,
6:07
slash cats as a get request,
6:10
there we go, we have no cats.
6:12
If I send a POST request, and add some JSON in the body,
6:16
it's expecting a name for a cat.
6:19
So I have a cat named Blue.
6:21
So I will send or I'll create this new cat.
6:25
There we go, we get a response.
6:27
Cat name is Blue.
6:28
Now if I go back to a get request,
6:31
let's see what we get.
6:33
Cats is an array with one entry,
6:35
let's send one more post request
6:37
to make a new cat.
6:38
What's another cat, Blue, and Rocket,
6:42
send as a POST request, we get that cat back,
6:46
we go back to a get request to slash cats.
6:49
And there we go.
6:50
We have two cats in our fake database
6:53
and we're seeing them both here as JSON.
6:56
Now let's test a get request to cats slash name.
7:00
So there's no ID, we could have generated IDs.
7:03
But I'm just doing cats slash name right here.
7:06
So let's see if that works.
7:08
Cats slash rockets
7:11
as a get request.
7:12
And there we go.
7:13
We're getting cat name is Rockets.
7:16
If I do Blue,
7:20
we get Blue.
7:21
If I do some cat that doesn't exist,
7:24
we get error cat not found.
7:26
That's great.
7:27
And then if we do, how about an update,
7:30
so this patch route, same path, slash cats slash name
7:35
as a variable,
7:36
but I can pass in a new request dot params dot name.
7:39
So I could change Rockets name.
7:42
If I send a patch request to cat slash rocket,
7:46
I'll update name to be
7:50
Rockets, how about Red Rockets?
7:54
Alright, send.
7:57
And now I get this back.
7:59
Cat name is Red Rocket.
8:01
And if I send a get request to all cats,
8:05
that name has been updated.
8:07
It's a horrible name to begin with.
8:09
But it's not a good name for this API,
8:11
because we're using the cat name as the PATH variable
8:14
instead of an ID.
8:15
And having a space there is gonna be really obnoxious,
8:18
but we're just testing it out anyway.
8:20
Lastly, let's make sure we can delete a cat.
8:23
So we'll delete Blue,
8:24
I'm sorry, Blue.
8:24
She's sitting here right next to me.
8:26
She's a real cats.
8:27
I feel horrible about this.
8:29
Okay, delete,
8:31
cats slash blue.
8:33
Delete request.
8:35
What happens?
8:36
Message deleted?
8:37
Let's go back to slash cats.
8:41
And it worked, she's gone.
8:43
I'm sorry, blue.
8:44
All right, so that's the API.
8:46
We've tested it out using Insomnia, it works,
8:49
at least kind of it's really not set up very well.
8:53
The fact that we don't have ideas is obnoxious.
8:55
But the endpoints are there.
8:56
They're responding the way they should.
8:58
They're throwing errors when they should
8:59
and responding with a JSON error message when appropriate.
9:03
Now let's write some tests for these routes.
9:05
So that's gonna be the next video,
9:07
we're gonna start setting up our app
9:08
so that we can write tests,
9:10
we actually have to change a couple things.
9:12
It's really just one thing we need to change.
9:14
And then we'll see how we actually write tests
9:17
and make requests using supertest.
9:20
(lighthearted music)