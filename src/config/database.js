const mongoose = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect(
        "mongodb+srv://devpankajkumar14:staV9AL8I3zdfQT6@dev-tinder1.uqlsl.mongodb.net/devTinder",
    );
};

module.exports = connectDB;



