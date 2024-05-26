const express = require("express");
const router = express.Router();
const authController = require("../controllers/adminAuth.controller");
const {
  authenticateRefreshToken,
  authenticateAccessToken,
} = require("../middleware/jwtMiddleware");

router.get("/", authController.getUsers);

router.post("/auth", authController.adminLogin);

// Protected
router.get("/:id", authenticateAccessToken, authController.getUserByID);

router.post(
  "/token",
  authenticateRefreshToken,
  authController.generateNewToken
);

module.exports = router;
