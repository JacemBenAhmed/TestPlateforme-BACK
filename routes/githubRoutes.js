// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/githubController/authController');

router.get('/auth/github', authController.redirectToGitHub);

router.get('/auth/github/callback', authController.githubCallback);

module.exports = router;
