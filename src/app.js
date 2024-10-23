  const express = require("express");
  const connectDB = require("./config/database");
  const User = require("./models/user");
  const app = express();
  const { validateSignUpdata } = require("./utils/validation");
  const bcrypt = require('bcryptjs');
  const cookieParser = require('cookie-parser');
  const jwt = require('jsonwebtoken');
  const {userAuth} = require('./middlewares/auth');
  const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(cookieParser()); 

// post api does helps to push the users in the database or add new users 
app.post("/signup", async (req, res) => {
    
    try{
      //validate the data before creating a user
      validateSignUpdata(req);
    const {firstName, lastName, emailId, password} = req.body;
    // encrypt the password   
    const passwordHash = await bcrypt.hash(password, 10);   
      console.log(passwordHash);
     // creating new instance of the User Model
      const user = new User({
        firstName, 
        lastName,
        emailId,
        password: passwordHash
      });

      await user.save();
      res.send("User signed up successfully");

    }catch(err) {
      res.status(400).send("ERROR : " + err.message);
    }                                                                                                   
    });
    
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // Create a JWT token
      const token = await user.getJWT();

      // Add the token to the cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // Cookie expires in 8 hours
      });

      res.send("Logged in successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

    // Profile route
    app.get("/profile", userAuth, async (req, res) => {
      try {
        const user = req.user; // Assuming `userAuth` middleware adds the user to req
        res.send(user);
      } catch (err) {
        res.status(400).send("ERROR: " + err.message);
      }
    });




app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;

    // Logic for sending connection request goes here (e.g., add to database, etc.)
    
    console.log("Connection request sent");
    console.log(user.firstName + " sent the request to connect with you");
    res.send(user.firstName + " sent the request to connect with you");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});



  // Establish database connection and start the server
  connectDB()
    .then(() => {
      console.log("database connection established...");
      app.listen(7778, () => {
        console.log("server is succesfully listening on port 7778");
      });
    })
    .catch((err) => {
      console.log("database cannot be connected...", err);
    });




