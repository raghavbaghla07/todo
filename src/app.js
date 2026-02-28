const express = require("express");
const connectDB = require("./config/database");
const app = express();


connectDB()
    .then(() => {
        console.log("database connected successfully");
        app.listen(3000, () => {
            console.log("server is running on port:3000")
        });
    })
    .catch((err) => {
        console.log("database cannot be connected");
        console.log(err);
    }
    )
