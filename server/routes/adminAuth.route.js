const express = require('express');
const router = express.Router();
const authController = require('../controllers/adminAuth.controller');

router.get('/users', authController.getUsers);

router.post('/auth', authController.adminLogin);

module.exports = router;
