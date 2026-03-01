const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser")

require("dotenv").config();

app.use(express.json());
app.use(cookieParser())

const authRouter = require("./routes/auth");
app.use("/", authRouter)

const todoRouter = require("./routes/todo");
app.use("/", todoRouter)

connectDB()
    .then(() => {
        console.log("database connected successfully");
        app.listen(process.env.PORT, () => {
            console.log("server is running")
        });
    })
    .catch((err) => {
        console.log("database cannot be connected");
        console.log(err);
    }
    )
