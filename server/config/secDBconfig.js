// Load env vars
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// MongoDB connection
const mongoose = require('mongoose');

async function connectToSecDB() {
    try {
        await mongoose.connect(process.env.MDB_URL);
        console.log("Connected to secondary database (MongoDB)");
    } catch (error) {
        console.log("Unable to connect to secondary database:", error);
    }
}

module.exports = { connectToSecDB };