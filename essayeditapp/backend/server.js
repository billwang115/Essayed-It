/* E4 server.js */
"use strict";
const log = console.log;

/*Server environment setup*/
const env = process.env.NODE_ENV; // read the environment variable (will be 'production' in production mode)
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
      currentUserID: req.session.user,
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
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    isAdmin: false,
  });

  try {
    const newUser = await user.save();
    const member = new Member({
      userID: newUser._id,
      essays: [],
      score: 0,
    });
    await member.save();
    res.send(newUser);
  } catch (error) {
    if (isMongoError(error)) {
      res.status(500).send("Internal server error");
    } else {
      log(error);
      res.status(400).send("Bad Request");
    }
  }
});

//route for getting member info
app.get("/api/users/:id", mongoChecker, authenticate, async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(404).send();
    return;
  }

  try {
    const member = await Member.findById(id);
    if (!member) {
      res.status(404).send("Resource not found");
    } else {
      res.send(member);
    }
  } catch (error) {
    log(error);
    res.status(500).send("Internal Server Error");
  }
});

//route for

// POST /essays, created when user submits their essay to the site
app.post("/api/essays", mongoChecker, authenticate, async (req, res) => {
  //TODO: Add essay to list of essays for current user
  const essay = new Essay({
    title: req.body.title,
    body: req.body.body,
    //author: req.user._id,
    description: req.body.description,
    topic: req.body.topic,
    type: req.body.type,
    numCredits: req.body.numCredits,
    numWords: req.body.numWords,
    status: req.body.status
  });
  try {
    const result = await essay.save();
    res.send(result);
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
