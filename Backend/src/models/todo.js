const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    ,
    completed: {
        type: Boolean,
        default: false,

    }

}, { timestamps: true })

module.exports = mongoose.model("Todo", todoSchema) 