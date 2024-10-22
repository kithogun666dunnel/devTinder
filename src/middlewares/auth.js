const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async(req, res, next) => { 
  try{const {token} = req.cookies;
    // validate teh token
    if(!token) {
        throw new Error("user not authenticated");
     } 
    const decodedObj = await jwt.verify(token, "secretKey"); 

    const {_id} = decodedObj;
        // find the User
    const user = await User.findById(_id);
    if (!user) {
        throw new Error("user not found");
    } 
    req.user = user;
    
    next();
    }catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }


    };


// EXXxXXport the middleware functions
module.exports = {
    userAuth
};
