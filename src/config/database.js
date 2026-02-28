const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        process.env.MONGO_URL
    );
    console.log("connected to database " + mongoose.connection.name);
}
module.exports = connectDB;
