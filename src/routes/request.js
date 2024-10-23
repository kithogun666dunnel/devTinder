const express = require('express')
const requestRouter = express.Router()
const { userAuth } = require('../middlewares/auth');




requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        const user = req.user;

        // Logic for sending connection request goes here (e.g., add to database, etc.)

        console.log("Connection request sent");
        console.log(user.firstName + " sent the request to connect with you");
        res.send(user.firstName + " sent the request to connect with you");
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});


module.exports = requestRouter;