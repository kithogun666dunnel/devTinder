const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');


profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user; // Assuming `userAuth` middleware adds the user to req
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});
 

module.exports = profileRouter;