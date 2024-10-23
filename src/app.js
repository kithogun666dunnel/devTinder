const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(cookieParser());


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


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




