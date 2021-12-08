# team31
NOTE: there may be changes after the due date, will only relate to the deployment and not the base code, because of the issues with heroku services.


---------------------------------------READ ME FOR PHASE 2 (PHASE 1 README BELOW)------------------------------------------------
Note: Although we are missing a group member, we are only missing some of the functionality of the admin controls and user profile page. Not everything in those areas connect to the backend.
No new libraries that weren't shown in lecture.


LOCAL Running Instructions:
1) Run npm install in both /backend and /frontend directories.
2) Will need mongoDB installed locally, and you need to create an empty folder 'mongo-data'
3) Set up the database server by running 'mongod --dbpath mongo-data' and open the database in Compass
4) Create a new user either by manually creating one in compass (Required to create an admin user) or going through the react app and registering an account
Note: username must be at least 4 characters long
5) Navigate to /backend and create a directory called 'tests' and inside this directory create a file called testUsers.json with the form:
{
  "TEST_USER_ID": "61b00c3426ce5282451d2bbf",
  "TEST_USER_USERNAME": "ethan",
  "TEST_ISADMIN": false
}
inside the file. Replace the ID (get this from the _id in the user model in compass ), username, and isAdmin according to the user you just created. This is the test user that allows for a "session" locally.
6) Instructions for running the backend are at the top of server.js, it depends on the command prompt you are using.
7) Navigate through the website as described below in the phase 1 description.


Online deployment: LINK WILL GO HERE WHEN WE DEPLOY, DUE TO ISSUES WITH HEROKU SERVERS AND THE ALLOWED EXTENSION FOR DEPLOYMENT

Sample user has "user" and "user" for username and password.
Sample admin has "admin" and "admin" for username and password.
Additional users can be created using the normal registration on the main page.


Routes in server.js:

User:
app.post("/users/login"): expects username and password, creates a new user
app.get("/users/logout"): logs out, just needs the currentUser which we have from the session
app.get("/users/check-session"): sends the user if they are logged in

Member:
app.post("/api/users") creates a new member, needs a username
app.get("/api/users/:username"): gets member info from a username
app.post("/api/users/:username"): takes in an essay model object, adds to the list of written essays for that member
app.put("/api/users/:username"): same as above, adds to editors list
app.post("/api/users/:username/topics"): changes the topic of interest for given member

Essay:
app.post("/api/essays"): creates a new essay, needs all essay data information
app.post("/api/essays/:id"): Post a new edit to an essay, need in the form of an editschema
app.put("/api/essays/:id"): Changes the body and the edit rating of a given essay
app.get("/api/essays"): returns all essays
app.get("/api/essays/:id"): Gets a specific object from the id













------------------------------------------------------READ ME FROM PHASE 1------------------------------------------------------------------------------------
Used libraries: React Router (& history)


Upon opening the app, you will be on the welcome/login page. We have created two hard coded users, USER and ADMIN

For USER, use "user" for the username and password.
For ADMIN, use "admin" for the username and password.

Note: Due to the lack of back end, refreshing or hitting back on any page will lead back to the welcome back. Only use the links in each page to
avoid logging out. (Due to use of authorized pages)

-----------------USER View:

DASHBOARD:
Once logged in, you will be on the dashboard. Here you can see all available essays for you to edit, as
well as the title, description, type, word count, etc.
The search bar at the top can search for any essays by Title, Description, Author, and Topic.

To edit an essay, click the select essay button.

EDITOR:
The instructions to edit the essay are given within the page, but essentially highlight text to leave a comment,
fill out the comment, and repeat the process (removing and changing comments as needed) until satisfied with essay review.
Hitting the submit button will take you back to the dashboard.

PROFILE:
Here you can view statistics about your profile, or make any edits to your profile.

REQUEST REVIEW:
Need to get here from the header. Input all information about the essay you would like to request for a review, and submit.


YOUR REQUESTS:
Also accessible from the header, this allows you to see the progress of essay's you've requested to be reviewed.
Click on any of the requests to open up the VIEW EDITS page to see what comments the editor of your essay left.

VIEW EDITS:
Similar to the EDITOR view without the functionality, you can see the comments left and leave a score out of 5 stars. After you are done,
you can submit.



-----------------ADMIN View:

DASHBOARD: An admin will have a delete request button next to every essay in order to remove them from being able to be edited from everyone.

PROFILE: An admin profile page can search by user, then can ban them, award them credits, and deduct credits.

Every other view will be the same as a user, as an admin can edit and request edits as any other user can. Admins have unlimited credits
and have access to every essay, so their rating also isn't assigned the same as a user.
