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

// Create express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors());

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
  app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
  });
});
