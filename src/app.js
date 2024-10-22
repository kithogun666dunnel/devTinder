  const express = require("express");
  const connectDB = require("./config/database");
  const User = require("./models/user");
  const app = express();
  const { validateSignUpdata } = require("./utils/validation");
  const bcrypt = require('bcryptjs');
  const cors = require("cors");
  
app.use(cors)
app.use(express.json());

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
  try{
    const {emailId, password} = req.body;
    const user = await User.findOne({ emailId: emailId });
    if(!user) {
      throw new Error("invalid credential");
    }           
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if(isPasswordValid) {
      res.send("Logged in successfully");
    } else {
      throw new Error("incalid credentials");
    }
  }
    catch(err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
  );

// GET USER BY EMAIL 
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;  // POST requests can have a body

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("Error fetching user: " + err.message);  // 500 for server errors
  }
});

// delete user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;  // POST requests can have a body

  try {
    const user = await User.findByIdAndDelete( userId );
   res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting user: " + err.message);  // 500 for server errors
  }
})

// update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body; 


  try {
    const ALLOWED_UPDATES = ["photoUrl", "bio", "skills", "gender"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {

     throw new Error("Invalid update"); }



    const user =  await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true, 
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send("Error updating user: " + err.message);  // 500 for server errors
  }
})

// Feed API - GET / FEED - get all the users from the database
 app.get("/feed", async(req, res) => {


  try {
    const users = await User.find({});
    res.send(users);
  }
  catch (err) {
    res.status(400).send("error fetching user: " + err.message);

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
