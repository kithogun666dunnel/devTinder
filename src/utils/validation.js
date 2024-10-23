const validator = require('validator');

const validateSignUpdata = (req) => {
    const {firstName, lastName, emailId, password}   = req.body;

    if(!firstName || !lastName){
        throw new Error("First Name and Last Name are required");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email Id");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("please enter a strong password!");
    }
};

module.exports = {
    validateSignUpdata          


};