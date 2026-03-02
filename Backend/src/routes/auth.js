const express = require('express');
const authRouter = express.Router();
const User = require("../models/user")
const { userAuth } = require("../middlewares/auth")
const { validateSignUpData } = require("../utils/validation")

authRouter.post("/signup", async (req, res) => {
    // jo bhi req se user ka data ayagea we will send it in this
    // as in auth middleware we put user in req.user
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
            sameSite: "None"
        });

        return res
            .status(201)
            .json({
                message: "User created successfully",
                loggedIn: true,
            });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }
        return res.status(400).json({
            message: err.message
        });
    }
})

authRouter.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body
        const user = await User
            .findOne({ emailId })
            .select("+password");
        if (!user)
            return res
                .status(401)
                .json({ message: "Invalid credentials" });

        const isPasswordvalid = await user.validatePassword(password)
        if (!isPasswordvalid)
            return res
                .status(401)
                .json({ message: "Invalid credentials" });

        const token = await user.getJWT();
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });
        return res.status(200).json({
            message: "Login successful",
        });

    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
});

authRouter.post("/logout", async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: true
    });
    return res.json({
        message: "Logout successful"
    });
})

authRouter.get("/me", userAuth, (req, res) => {
    return res.json({ user: req.user });
});



module.exports = authRouter
