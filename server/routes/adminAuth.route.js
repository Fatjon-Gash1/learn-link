const express = require("express");
const router = express.Router();
const authController = require("../controllers/adminAuth.controller");
const authenticateToken = require("../middleware/jwtMiddleware");

router.get("/", authController.getUsers);

router.get("/:id", authenticateToken, authController.getUserByID);

router.post("/auth", authController.adminLogin);

module.exports = router;
