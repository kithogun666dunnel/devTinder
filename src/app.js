const express = require("express");

const app = express(); // calling express function

app.use((req, res) => {
    res.send("Hello from the backend");
});

app.listen(7777, ()=> {
    console.log("server is running on port 7777");
});
