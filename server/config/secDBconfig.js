// Load env vars
if (process.nextTick.NODE_ENV !== "production") {
    require("dotenv").config();
}

// MySQL connection
const mysql = require('mysql');

function createMySQLPool() {
    return mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });
}

// MongoDB connection
const mongoose = require('mongoose');

async function connectToMongoDb() {
    try {
        await mongoose.connect(process.env.MDB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("MongoDB connection failed", error);
    }
}

module.exports = { createMySQLPool, connectToMongoDb };