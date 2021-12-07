/* E4 server.js */
"use strict";
const log = console.log;

/*Server environment setup*/
// To run in development mode, run normally: "node server.js"
// To run in development with the test user logged in the backend, run: "SET TEST_USER_ON=true node server.js" (if on command prompt) OR "$env:TEST_USER_ON="true"; node server.js" (if on Powershell) OR "TEST_USER_ON=true node server.js" (If on Linux)
// To run in production mode, run in terminal: "NODE_ENV=production node server.js" (if on linux) OR "SET NODE_ENV=production node server.js" (if on command prompt) OR "$env:NODE_ENV="production"; node server.js" (if on Powershell)
const env = process.env.NODE_ENV; // read the environment variable (will be 'production' in production mode)
const USE_TEST_USER = env !== "production" && process.env.TEST_USER_ON; // option to turn on the test user.
const data = require("./tests/testUsers.json");
const TEST_USER_ID = data.TEST_USER_ID; // the id of our test user (you will have to replace it with a test user that you made). can also put this into a separate configutation file
const TEST_USER_USERNAME = data.TEST_USER_USERNAME;
const TEST_ISADMIN = data.TEST_ISADMIN;

const path = require("path");

// Express
const express = require("express");
const app = express();
//replaced body parser with express.json since body parser is deprecated
app.use(express.json()); //For JSON requests
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");

if (env !== "production") {
  app.use(cors());
}

// Mongo and Mongoose
const { ObjectId } = require("mongodb");
const { mongoose } = require("./db/mongoose");
const { Essay } = require("./models/essay");
const { User } = require("./models/user");
const { Member } = require("./models/member");

//manage user sessions
const session = require("express-session");
const MongoStore = require("connect-mongo"); // to store session information on the database in production

/*** Helper functions **************************************/
const isMongoError = (error) => {
  // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return (
    typeof error === "object" &&
    error !== null &&
    error.name === "MongoNetworkError"
  );
};

const mongoChecker = (req, res, next) => {
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log("Issue with mongoose connection");
    res.status(500).send("Internal server error");
    return;
  } else {
    next();
  }
};

const authenticate = async (req, res, next) => {
  if (env !== "production" && USE_TEST_USER) {
    req.session.user = TEST_USER_ID; // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)
  }

  if (req.session.user) {
    try {
      const foundUser = await User.findById(req.session.user);
      if (!foundUser) {
        return Promise.reject();
      } else {
        req.user = foundUser;
        next();
      }
    } catch (error) {
      res.status(401).send("Unauthorized");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

/*** Session handling **************************************/
// Create a session and session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000,
      httpOnly: true,
    },
    // store the sessions on the database in production
    store:
      env === "production"
        ? MongoStore.create({
            mongoUrl:
              process.env.MONGODB_URI ||
              "mongodb://localhost:27017/EssayedItAPI",
          })
        : null,
  })
);

// A route to login and create a session
app.post("/users/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const foundUser = await User.findUserByUsernamePassword(username, password);
    req.session.user = foundUser._id;
    req.session.username = foundUser.username;
    req.session.isAdmin = foundUser.isAdmin;
    res.send({
      currentUser: foundUser.username,
      isAdmin: foundUser.isAdmin,
      currentUserID: foundUser._id,
    });
  } catch (error) {
    res.status(400).send();
  }
});

// A route to logout a user
app.get("/users/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send();
    }
  });
});

// A route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
  if (env !== "production" && USE_TEST_USER) {
    req.session.user = TEST_USER_ID;
    req.session.username = TEST_USER_USERNAME;
    req.session.isAdmin = TEST_ISADMIN;
    res.send({
      currentUser: TEST_USER_USERNAME,
      isAdmin: TEST_ISADMIN,
      currentUserID: TEST_USER_ID,
    });
    return;
  }

  if (req.session.user) {
    res.send({
      currentUser: req.session.username,
      isAdmin: req.session.isAdmin,
      currentUserID: req.session.user,
    });
  } else {
    res.status(401).send();
  }
});

/*** API Routes below ************************************/
// route for creating new user
app.post("/api/users", mongoChecker, async (req, res) => {
  const member = new Member({
    username: req.body.username,
    essays: [],
    score: 0,
    topics: [],
    credits: 1,
  });

  let newMember;
  try {
    newMember = await member.save();
  } catch (error) {
    if (isMongoError(error)) {
      res.status(500).send("Internal server error");
    } else {
      log(error);
      res.status(400).send("Bad Request");
    }
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    isAdmin: false,
    memberID: newMember._id,
  });

  try {
    const newUser = await user.save();
    req.session.user = newUser._id;
    req.session.username = newUser.username;
    req.session.isAdmin = newUser.isAdmin;
    res.send({
      currentUser: newUser.username,
      isAdmin: newUser.isAdmin,
      currentUserID: newUser._id,
    });
  } catch (error) {
    if (isMongoError(error)) {
      res.status(500).send("Internal server error");
    } else {
      log(error);
      res.status(400).send("Bad Request");
    }
  }
});

//route for getting member info from username
app.get(
  "/api/users/:username",
  mongoChecker,
  authenticate,
  async (req, res) => {
    const username = req.params.username;

    try {
      const member = await Member.findByUsername(username);
      if (!member) {
        res.status(404).send("Resource not found");
      } else {
        res.send(member);
      }
    } catch (error) {
      log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

//POST new essay to list of essays after getting member by username
app.post("/api/users/:username", mongoChecker, authenticate, async (req, res) => {
  const username = req.params.username;

  try {
    const member = await Member.findByUsername(username);
    if (!member) {
      res.status(404).send("Resource not found");
    } else {
      member.essays.push(req.body);
      const result = await member.save();
      res.send(result);
    }
  } catch (error) {
    log(error);
    if (isMongoError(error)) {
      res.status(500).send("Internal server error");
    } else {
      res.status(400).send("Bad Request");
    }
  }
});

/*//route for changing your topics of interest
app.post("/api/users", mongoChecker, authenticate, async () => {
  const id = req.user._id;
  const topicsOfInterest = req.body.essay;
  try {
    const member = await Member.findById(id);
  } catch (error) {
    log(error);
    res.status(500).send("Internal Server Error");
  }
});*/

// POST /essays, created when user submits their essay to the site
app.post("/api/essays", mongoChecker, authenticate, async (req, res) => {
  const essay = new Essay({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
    description: req.body.description,
    topic: req.body.topic,
    type: req.body.type,
    numCredits: req.body.numCredits,
    numWords: req.body.numWords,
    status: req.body.status,
  });
  try {
    const result = await essay.save();
    res.send(essay);
  } catch (error) {
    log(error);
    res.status(400).send("Bad Request");
  }
});

// POST /essays/id, posting a new edit to an essay, will have to loop through
app.post("/api/essays/:id", mongoChecker, authenticate, async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(404).send();
    return;
  }

  try {
    const essay = await Essay.findById(id);
    if (!essay) {
      res.status(404).send("Resource not found");
    } else {
      essay.edits.push(req.body);
      const result = await essay.save();
      res.send(essay);
    }
  } catch (error) {
    log(error);
    if (isMongoError(error)) {
      res.status(500).send("Internal server error");
    } else {
      res.status(400).send("Bad Request");
    }
  }
});

//Request to GET all essays
app.get("/api/essays", mongoChecker, authenticate, async (req, res) => {
  try {
    const essays = await Essay.find();
    if (!essays) {
      res.status(404).send("Resource not found");
    } else {
      res.send(essays);
    }
  } catch (error) {
    log(error);
    res.status(500).send("Internal Server Error");
  }
});

//Request to GET one specific essay
app.get("/api/essays/:id", mongoChecker, authenticate, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  if (!ObjectId.isValid(id)) {
    res.status(404).send();
    return;
  }

  try {
    const essay = await Essay.findById(id);
    if (!essay) {
      res.status(404).send("Resource not found");
    } else {
      res.send(essay);
    }
  } catch (error) {
    log(error);
    res.status(500).send("Internal Server Error");
  }
});

/*** Webpage routes below **********************************/
app.use(express.static(path.join(__dirname, "/client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
  // check for page routes that we expect in the frontend to provide correct status code.
  const goodPageRoutes = [
    "/",
    "/viewRequest",
    "/reviewEssays",
    "/profile",
    "/yourRequests",
    "/Request",
    "/Editor",
  ];
  if (!goodPageRoutes.includes(req.url)) {
    res.status(404);
  }

  // send index.html
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
});
