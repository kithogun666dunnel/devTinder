  const express = require("express");
  const connectDB = require("./config/database");
  const User = require("./models/user");
  const app = express();

  app.post("/signup", async (req, res) => {

    // creating new instance of the User Model
    const user = new User({
      firstName: "sachin",
      lastName: "tend",
      emailId: "sachinl@123",
      password: "sachinsdfasdf@123",
    
    });



    try{
      await user.save();
      res.send("User signed up successfully");

    }catch(err) {
      res.status(400).send("error saving user: " + err.message);
    }                                                                                                   
 // Sending a response after saving the user
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
