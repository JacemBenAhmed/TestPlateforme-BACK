const express = require('express');
const { runJenkinsJob } = require('../controllers/jenkinsController');

const router = express.Router();

router.post('/run-job', runJenkinsJob);

module.exports = router;
