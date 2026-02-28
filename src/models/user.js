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

userSchema.pre("save", async function () {
    const user = this;
    if (user.isModified("password"))
        user.password = await bcrypt.hash(user.password, 10);
})



userSchema.methods.getJWT = async function () {
    const user = this;
    const token = jwt.sign(
        { _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)
    return isPasswordValid
}


module.exports = mongoose.model("User", userSchema) 