// Load env vars
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const jwt = require("jsonwebtoken");


function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('middleware token: ', token);
      return res.status(403).json({ message: "Invalid token." });
    }

    req.user = user;
    next();
  });
}

function authenticateRefreshToken(req, res, next) {
  const refreshToken = req.cookies.refreshToken;
  console.log('Refresh Token:', refreshToken);
  if (!refreshToken) {
    return res.status(401).json({ message: "Access denied. Refresh token missing."});
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token." });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken, authenticateRefreshToken };