const express = require('express');
const authRouter = express.Router();
const User = require("../models/user")
const validateSignUpData = require("../utils/validation")

authRouter.post("/signup", async (req, res) => {
    // jo bhi req se user ka data ayagea we will send it in this
    // as in out auth middleware we put user in req.user
    // we will receive it here
    try {
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;
        const user = new User({
            firstName,
            lastName,
            emailId,
            password
        });
        await user.save();
        res.send("user added succesfully");
    } catch (err) {
        res
            .status(400)
            .send("ERROR: " + err.message)
    }
})

authRouter.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body
        const user = await User.findOne({ emailId });
        if (!user)
            throw new Error("invalid credentials")

        const isPasswordvalid = await user.validatePassword(password)
        if (!isPasswordvalid)
            throw new Error("invalid credentials")
        else {
            const token = await user.getJWT();
            res.cookie("token", token)
            res.send("user login succcessful")
        }
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    })
    res.send("logout successful")
})

module.exports = authRouter
