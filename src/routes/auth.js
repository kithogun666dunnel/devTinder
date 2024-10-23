const express = require("express");
const authRouter = express.Router();

const { validateSignUpdata } = require("../utils/validation");
const bcrypt = require('bcryptjs');
const User = require("../models/user");


authRouter.post("/signup", async (req, res) => {

    try {
        //validate the data before creating a user
        validateSignUpdata(req);
        const { firstName, lastName, emailId, password } = req.body;
        // encrypt the password   
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);
        // creating new instance of the User Model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });

        await user.save();
        res.send("User signed up successfully");

    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});



authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            // Create a JWT token
            const token = await user.getJWT();

            // Add the token to the cookie and send the response back to the user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000), // Cookie expires in 8 hours
            });

            res.send("Logged in successfully");
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = authRouter;