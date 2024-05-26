// Load env vars
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const jwt = require("jsonwebtoken");

function authenticateAccessToken(req, res, next) {
  const accessToken = req.header("Authorization")?.split(" ")[1];

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Access denied. Access token missing." });
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("middleware token: ", accessToken); // For debugging
      return res.status(403).json({ message: "Invalid access token." });
    }
    req.user = user;
    next();
  });
}

function authenticateRefreshToken(req, res, next) {
  const refreshToken = req.cookies.refreshToken;
  console.log("Refresh Token:", refreshToken); // For debugging
  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Access denied. Refresh token missing." });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token." });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateAccessToken, authenticateRefreshToken };
