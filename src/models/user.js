const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');

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
}
);

userSchema.methods.getJWT = async function () {     // dont use Arrow function here as this keyword will not be compatible with it 
    const user = this;   // for instance of particular user....
    const token = await jwt.sign({ _id: user._id }, "secretKey", {
        expiresIn: "7d", // Token expiry in 7 days
    });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}



module.exports= mongoose.model("User", userSchema);   


// attaching helper methods in this schema that would closely relate to user