const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4
    },
    lastName: {
        type: String,
        
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email not valid" + value);
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Password not valid " + value);
            }
        }
    },
    age: {
        type: Number,
        minLength:18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "other"].includes(value)){
                throw new Error("gender data not valid");           }
        },
    },
    photoUrl: {
        type: String,
        default: "https://www.pngwing.com/en/free-png-zkwwb",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("photo Url not valid " + value);
            }
        },
    },
    bio: {
        type: String,
        default: "I am new here",
    },
    skills: {
        type: [String],
    },
},
{
    timestamps: true,
});

module.exports= mongoose.model("User", userSchema);   