
// handle auth middleware for all GET, POST, PUT, PATCH, DELETE requests
// Define the adminAuth middleware
const adminAuth = (req, res, next) => {
    console.log("admin auth is getting checked");
    const token = "XYZ";
    const isAdminAuthorized = token === "XYZ";

    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized Admin");
    } else {
        next(); // Proceed to the next middleware or route handler
    }
};

// Define the userAuth middleware
const userAuth = (req, res, next) => {
    console.log("user auth is getting checked");
    const token = "XYZU";
    const isUserAuthorized = token === "XYZU";

    if (!isUserAuthorized) {
        res.status(401).send("Unauthorized User");
    } else {
        next(); // Proceed to the next middleware or route handler if authorized
    }
};

// Export the middleware functions
module.exports = {
    adminAuth,
    userAuth
};
