const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {registerUser, loginUser, userDashboard } = require('../controllers/users');

// Login Page
router.route('/login').post(loginUser);

// Register Page
router.route('/register').post(registerUser);
router.route('/dashboard').get(userDashboard);

module.exports = router;