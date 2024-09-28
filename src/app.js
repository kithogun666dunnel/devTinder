const express = require("express");

const app = express(); // calling express function

app.use("/", (req, res) => {
    res.send("hellow form the Dashboard");
});

app.use("/hello", (req, res) => {
    res.send("Hello HelloHelloHelloHelloHello");
});

app.use("/test", (req, res) => {
    res.send("test from the backend");
});

app.listen(7777, ()=> {
    console.log("server is successfully listening on port 7777");
});
