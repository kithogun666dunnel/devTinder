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
  try{
    const {emailId, password} = req.body;
    const user = await User.findOne({ emailId: emailId });
    if(!user) {
      throw new Error("invalid credential");
    }           
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if(isPasswordValid) {

      // create a JWT token
      const token = await jwt.sign({
        _id: user._id}, "secretKey");
      // ADD THE TOKEN TO COOKIE AND SEND THE RESPONSE BACK TO USER



      res.cookie("token", token);
      res.send("Logged in successfully");
    } else {
      throw new Error("invalid credentials");
    }
  }
    catch(err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
  );

app.get("/profile", userAuth, async (req, res) => {
  try{
    const user = req.user;
    res.send(user);
    }
   catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });


app.post("/sendConnectionRequest", userAuth, async(req, res) => {
  const user = req.user;
  


console.log("connection request sent");
console.log(user.firstName + " " + "sent the request to connect with you");
res.send(user.firstName + " " + "sent the request to connect with you"); 
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
