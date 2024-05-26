// Load env vars
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const { checkPrimaryDBConn, sequelize } = require("./models/primary_db");
const { connectToSecDB } = require("./config/secDBconfig");
const postsRoute = require("./routes/posts.route");
const adminAuthRoute = require("./routes/adminAuth.route");
const cookieParser = require("cookie-parser");


// Create express app
const app = express();

// Configure express app
const corsOptions = {
  origin: ['http://localhost:3001', 'http://192.168.0.15:3001'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Check Connection to primary database (MySQL)
checkPrimaryDBConn();

// Connect to secondary database (MongoDB)
connectToSecDB();

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Server Active" });
});

app.use("/users", adminAuthRoute);
app.use("/posts", postsRoute);

// Start server
sequelize.sync().then(() => {
  app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log("Server running on port " + process.env.PORT);
  });
});
