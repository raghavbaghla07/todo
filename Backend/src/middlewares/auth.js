const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token)
            throw new Error("Authentication required. Please login.");

        const decodedObj = jwt.verify(token, process.env.JWT_SECRET)

        // find the user
        const { _id } = decodedObj;
        const user = await User.findById(_id);
        if (!user)
            throw new Error("user not found")
        req.user = user
        next();

    } catch (err) {

        let message = "Authentication failed";

        if (err.name === "TokenExpiredError") {
            message = "Session expired. Please login again.";
        }

        res.status(401).json({ message });
    }
}
module.exports = { userAuth };