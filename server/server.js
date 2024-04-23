// Load env vars
if (process.nextTick.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const primaryDB = require("./models/primary_db");
const { checkPrimaryDBConn } = require("./models/primary_db/index");
const { connectToSecDB } = require("./config/secDBconfig");
const postsRoute = require("./routes/posts.route");
const adminAuthRoute = require("./routes/adminAuth.route");
const configureAdminJS = require("./admin/admin");

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
app.get('/', (req, res) => {
  res.json({ message: 'Server Active' });
});

app.use("/posts", postsRoute);
app.use("/adminlogin", adminAuthRoute); 

// Configure AdminJS
configureAdminJS(app);

// Start server
primaryDB.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
  });
});
