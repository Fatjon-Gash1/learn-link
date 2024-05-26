const express = require("express");
const router = express.Router();
const authController = require("../controllers/adminAuth.controller");
const { authenticateRefreshToken, authenticateToken } = require("../middleware/jwtMiddleware");

router.get("/", authController.getUsers);

router.get("/:id", authenticateToken, authController.getUserByID);

router.post("/auth", authController.adminLogin);

router.post("/Token", authenticateRefreshToken, authController.generateNewToken);


module.exports = router;
