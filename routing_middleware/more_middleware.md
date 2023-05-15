can you please evaluate the following transcript for important terms, ideas , and give a simple demonstration of the concepts for review?



Skip navigation




Avatar image


0:01 / 11:05

Transcript


0:00
(upbeat music)
0:04
- Next, let's try writing another example of middleware
0:07
but rather than applying it to every single request,
0:10
no matter what the path is, just every single request,
0:13
we're logging out some information.
0:15
Rather than doing that, let's be more targeted.
0:18
So, I'm gonna start by defining two routes in here.
0:20
I'm just gonna do them in this file
0:21
because they don't really have to do with my user's routes.
0:25
And, they're gonna be kind of silly.
0:26
The first one will be secret, request, response.
0:33
And, we'll start in here.
0:35
What I want to do is protect this route
0:37
with fake authentication, not real auth.
0:40
We're just gonna look for a query string.
0:44
And that query string, let's say it's password,
0:47
and it needs to be set to, how about monkey breath?
0:51
So that's what we wanna look for,
0:52
request dot query dot password
0:58
equals monkey breath.
1:01
So we're gonna check if request dot password
1:03
equals monkey breath,
1:05
and if they do have that password query string
1:07
correctly set in the request,
1:10
let's res dot send welcome, or congrats, or here's a secret.
1:14
And if they don't, so let's do it the other way around.
1:17
If there is no password set
1:19
to monkey breath in the query string,
1:21
we can just throw one of our errors that we've set up.
1:25
Throw new express error.
1:30
And we'll go with missing password.
1:35
And then an unauthorized status code, which is 402.
1:38
I can never keep all the status code straight, to be honest.
1:41
Otherwise we'll do res dot send.
1:44
And, what's the secret to include here?
1:47
"I love you."
1:51
Let's do a heart.
1:52
"For real marry me."
1:56
All right, that's our secrets.
1:57
Okay.
1:58
So, no middleware involved at this point,
2:01
We have our slash secret, let's just see what happens.
2:03
See if we screwed anything up.
2:05
So, slash secrets.
2:07
And if I don't include that password
2:08
we get error missing password res or status as four oh two.
2:13
But if I do include password equals monkey breath,
2:17
we get I love you, heart for real, marry me.
2:20
All right.
2:21
So no middleware.
2:22
But let's say I want another route
2:23
that is also protected with the same password.
2:26
And when I say protected, it's not really protected,
2:28
it's a dumb query string version
2:30
of authentication or authorization,
2:33
but it's good enough for this demo.
2:35
And let's set this one to slash private as the path.
2:39
And we'll check for that password,
2:41
missing password, same error, res dot send.
2:45
Res should be private.
2:47
You have reached the private page.
2:52
It is private.
2:55
Okay.
2:56
So, if I go to slash privates...
3:01
if I don't have the password, or if it's incorrect,
3:04
there we go, missing password.
3:05
Anyway, now that we have that set up,
3:08
we have two routes that are doing the same thing.
3:10
We're looking to see if the query string contains password,
3:14
and we want to make sure it's set to monkey breath.
3:16
If it's not, we throw an error.
3:18
Which then is caught down here, or it's not caught,
3:21
but we end up running this code down here.
3:24
Now, technically the way that I showed you to do this
3:26
was to try and catch this code.
3:29
And, it doesn't actually matter right now
3:31
with what we've done.
3:32
But, when we get to asynchronous code
3:34
and working with databases, try and catch is very important
3:39
in order for this pattern to work
3:41
where we're throwing the error.
3:42
So, we will catch that error
3:45
and then call next with E.
3:49
Which is this error that we threw.
3:53
And we can return that, and we can return this
3:55
just to be extra explicit.
3:57
And then, we need to make sure we add next
3:59
as a parameter here.
4:01
So this is all hopefully review
4:03
from when we talked about errors.
4:04
So I'll just paste that in here,
4:07
duplicate it, put next in there,
4:10
and then, res dot send this line
4:14
instead of what I have right here.
4:18
Return, res dot send.
4:20
Okay, so nothing should change.
4:22
This is just an extra code at this point.
4:25
It seems kind of annoying,
4:26
but this pattern of trying and catching is very important
4:29
when we get to asynchronous code and longer or functions.
4:32
Route handlers that are not synchronous, that take longer,
4:36
there could be an error connecting to the database,
4:38
there could be some other issue
4:39
for sending a API call somewhere.
4:41
So it's best to follow this pattern.
4:44
But anyway, we're duplicating this code.
4:48
There's a lot of duplication here.
4:50
So what we could do instead, is create a middleware.
4:53
And that middleware is going to check
4:55
for the password and see if it's equal to monkey breath.
4:59
So we could do this in our middleware file.
5:01
We'll call a new function, how about check for password?
5:08
And this function will receive request, response and next.
5:14
And then inside, when I copy most of what we just did,
5:20
I'll alter it.
5:21
We're not going to do the res dot send in here.
5:24
So we have our logic here.
5:25
See if the password is part of the query string,
5:28
if it's set to monkey breath,
5:30
technically we're checking to see
5:31
if it's not set to monkey breath.
5:33
And if it is not monkey breath, we throw this error.
5:36
But what we want to do is run this code
5:39
before this logic in here.
5:42
And then, if we do have the correct password,
5:46
we would like for this line to run.
5:48
Same thing here.
5:49
So the hope is that I can remove
5:51
all of that duplicated logic
5:53
and just have that middleware run first.
5:57
And if there is an error or if we're missing the password,
5:59
we throw that error.
6:01
But if we're not missing the password,
6:03
we want to also run this, or run this.
6:06
So how do we do that?
6:07
This is where next comes into play again.
6:11
So here we have if request dot query dot password,
6:14
blah, blah, blah.
6:15
So this is the bad case if you're missing the password.
6:18
But if things go well, if you do have the password,
6:22
we can call next,
6:24
which we'll just move on to the next thing.
6:26
And in our case, if we set up our middleware correctly,
6:30
the next thing should be this route handler,
6:32
or this route handler.
6:34
So next is super essential.
6:36
If we don't include it, we won't make it to the next route.
6:38
Notice that we're not passing anything to next.
6:41
In this case,
6:43
that is important.
6:44
This just tells express, all right, go on to the next thing.
6:47
If we pass something into next,
6:49
it doesn't actually matter what it is.
6:50
Express is always going to treat that as an error.
6:53
Which is what we've been doing
6:54
in order to run this down here, our error handler.
6:58
So, usually we don't pass anything to next
7:01
unless we are trying to hit that error handler
7:04
or some other error handler.
7:06
Alrighty.
7:07
So now we have this middleware setup,
7:09
but we're not actually using it.
7:11
So I am going to export it, check for password.
7:15
Then, over here, where I have these routes,
7:18
what I can do if I want to selectively use a middleware,
7:23
is add it as the second parameter,
7:25
or second argument, rather,
7:27
to one of my app dot gets or any other route definition.
7:30
It can be a post request, a delete request,
7:32
it doesn't matter, but we just have get requests.
7:34
So I've imported middleware, I've required it.
7:37
All I'll do is pass in that function here.
7:40
So middleware dot check for password.
7:44
And that is the second argument.
7:45
And then the third argument is my handler.
7:48
It's the actual callback, same thing here.
7:52
All right.
7:53
So now I have two routes,
7:55
slash secret and slash private,
7:57
both get requests to different paths
7:59
before each of their handlers run,
8:02
this function is supposed to run.
8:04
And in this function, we are checking for
8:06
requests dot query dot password,
8:08
and we're either throwing an error
8:10
and then catching it and returning it here,
8:12
or, we're saying all right, move along,
8:15
go to the next thing.
8:16
If the password is correct.
8:18
And the next thing is this here, or this here.
8:23
So let's see if it works.
8:24
We'll go to slash privates with no password.
8:28
Express errors, not defined, oh,
8:30
well, it doesn't work.
8:32
We have to include our express error in this function too.
8:36
Try it one more time.
8:38
Now we get missing password status four oh two.
8:40
But if I add in password equals monkey breath-
8:45
you have reached the private page, it is private.
8:48
Same thing for slash secret.
8:51
I love you, heart, for real marry me.
8:53
But if the password is incorrect, missing password.
8:56
So this is not real authentication,
8:58
but we do have a real middleware,
9:00
and it's not running for every single route,
9:02
I can still go to slash users.
9:07
And I see the users,
9:08
I don't get that error message.
9:10
But, for these two and any other route
9:13
I define where I pass in middleware dot check for password,
9:16
we will be checking the query string
9:18
for a password set to monkey breath.
9:21
So, what's making this seem more complicated
9:23
than it actually is,
9:24
is the error handling that we have going on
9:26
and the try and the catch.
9:28
But if we instead were just printing something out,
9:32
right, if we just did something like this,
9:34
console dot log, checking for password -
9:41
and then we called next, just like that,
9:45
our middleware is still gonna work,
9:47
it's just not very exciting.
9:48
If we go to slash secret, we get the response,
9:53
and over here, we see checking for password.
9:56
If I go to slash privates,
9:59
we get checking for password.
10:02
So, whatever happens in this function,
10:05
we want to run next at some point
10:07
so that we can move on to the next function
10:09
or to the route handler,
10:11
like this one right here and this one right here.
10:14
Middleware dot check for password runs first.
10:16
Without that next, if we don't call next,
10:18
nothing else happens.
10:20
So we do want next in there somewhere.
10:22
But it looks more complicated than it actually is.
10:25
Just because this error handling logic is kind of,
10:28
eh, it's just kind of annoying.
10:29
It's a lot, but this is the essential part here.
10:32
And then of course we have the actual logic here.
10:35
All right.
10:36
So, define a function,
10:37
request response next,
10:39
pass it in as the second argument
10:41
to one of your route definitions
10:42
like we have here and here,
10:44
and that function will run
10:45
before this callback here or this callback.
10:49
And if you wanted to use some middleware
10:50
for every single route or every request
10:52
that comes in regardless of the HTTP method,
10:55
regardless of the path, we could pass it into app dot use.
10:59
(soft upbeat music)