// staV9AL8I3zdfQT6

// devpankajkumar14




const mongoose = require("mongoose");


const connectDB = async()=>{
    await mongoose.connect(
        "mongodb+srv://devpankajkumar14:staV9AL8I3zdfQT6@dev-tinder1.uqlsl.mongodb.net/"
    );
};

connectDB()
    .then(() => {
        console.log("database connection established...");
    })
    .catch((err) => {
        console.log("database cannot be connecteeddddd....");
    });

