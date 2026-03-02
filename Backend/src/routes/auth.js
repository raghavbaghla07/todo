const express = require('express');
const authRouter = express.Router();
const User = require("../models/user")
const authMiddleware = require("../middleware/auth")
const { validateSignUpData } = require("../utils/validation")

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
        const token = await user.getJWT();
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"

        });
        res.status(201).json({
            message: "User created successfully",
        });

    } catch (err) {
        res
            .status(400)
            .send("ERROR: email already exists")

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

        const token = await user.getJWT();
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.status(200).json({
            message: "Login successful",
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

authRouter.post("/logout", async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: true
    });
    res.send("logout successful")
})

authRouter.get("/me", authMiddleware, (req, res) => {
    res.json({ user: req.user });
});



module.exports = authRouter
