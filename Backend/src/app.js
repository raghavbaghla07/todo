const app = express();
app.set("trust proxy", 1);
const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser")

require("dotenv").config();


const cors = require("cors");
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
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
