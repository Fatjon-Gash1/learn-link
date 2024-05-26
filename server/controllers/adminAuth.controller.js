// Load env vars
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/primary_db/");
const EXPIRY = { REFRESH_TOKEN: "20s", ACCESS_TOKEN: "15s" };

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

    // Generate refresh token
    const refreshToken = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: EXPIRY.REFRESH_TOKEN }
    );

    // Generate access token
    const accessToken = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: EXPIRY.ACCESS_TOKEN }
    );

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 20000,
      })
      .json({ accessToken, userID: user.id, message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const generateNewToken = (req, res) => {
  const { userID, username } = req.body;
  try {
    const accessToken = jwt.sign(
      { userId: userID, username: username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: EXPIRY.ACCESS_TOKEN }
    );

    const refreshToken = jwt.sign(
      { userId: userID, username: username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: EXPIRY.REFRESH_TOKEN }
    );

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 20000,
      })
      .json({ accessToken });
  } catch (error) {
    console.error("Error generating new tokens:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getUsers, getUserByID, adminLogin, generateNewToken };
