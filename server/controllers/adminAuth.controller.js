// Load env vars
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/primary_db/");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    console.log("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserByID = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    res.status(200).json({ user });
  } catch (error) {
    console.log("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function adminLogin(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (user.access_level === "0") {
      return res.status(403).json({ message: "Access forbidden" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: 5 }
    );

    res
      .status(200)
      .json({ token, userID: user.id, message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { getUsers, getUserByID, adminLogin };
