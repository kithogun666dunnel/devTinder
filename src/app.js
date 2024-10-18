  const express = require("express");
  const connectDB = require("./config/database");
  const User = require("./models/user");
  const app = express();
app.use(express.json());

// post api does helps to push the users in the database or add new users 
  app.post("/signup", async (req, res) => {

   // creating new instance of the User Model
    const user = new User(req.body);

    try{
      await user.save();
      res.send("User signed up successfully");

    }catch(err) {
      res.status(400).send("error saving user: " + err.message);
    }                                                                                                   
    });

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
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body; 


  try {
    const ALLOWED_UPDATES = ["photoUrl", "bio", "skills", "userId", "gender"];

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
