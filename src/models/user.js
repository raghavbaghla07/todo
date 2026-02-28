const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
        trim: true,
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 50,
        trim: true,
    },
    emailId: {
        required: true,
        type: String,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid e-mail adress");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value))
                throw new Error("Enter a strong password")
        }
    }
}, {
    timestamps: true
})

module.export = mongoose.model("User", userSchema) 