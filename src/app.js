const express = require("express");
const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);


app.get("/user", userAuth, (req, res) => {
  res.send("USER DATA SENT");
});



app.get("/admin/getAllData", (req, res) => {
  res.send("ALL DATA SENT");
});

app.get("/admin/deleteUser", 
  (req, res) => {
  res.send("deleted User data");
});


app.listen(7777, () => {
  console.log("server is succesfully listening on port 7777");
});
