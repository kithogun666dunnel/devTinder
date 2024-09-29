const express = require("express");

const app = express(); // calling express function

app.use("/user", (req, res) => {
    res.send("HAHAHAHHAHAHAHHAHAAH");
});
// 



// this will match only GET requests to the /test route
app.get("/user", (req, res) => {
    res.send({ firstName: "John", lastName: "Doe" });
});


app.post("/user", (req, res) => {
  // Save data to the database 
    res.send("data successfully saved to the database");
});
app.delete("/user", (req, res) => {
    res.send("deleted data successfully from the database");
});

// this will match all the HTTP methods API calls to the /test route
app.use("/test", (req, res) => {
    res.send("test from the backend");
});




app.listen(7777, () => {
    console.log("server is successfully listening on port 7777");
});
