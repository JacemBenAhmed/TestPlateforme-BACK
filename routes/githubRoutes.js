// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/githubController/authController');
const repoController = require('../controllers/githubController/repoController');


router.get('/auth/github', authController.redirectToGitHub);
router.get('/auth/github/callback', authController.githubCallback);
router.get('/github/repos', repoController.getAllRepositories);



module.exports = router;
