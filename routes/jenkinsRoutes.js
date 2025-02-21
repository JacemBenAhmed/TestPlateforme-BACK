const express = require('express');
const { runJenkinsJob,getJenkinsJobs } = require('../controllers/jenkinsController');

const router = express.Router();

router.post('/run-job', runJenkinsJob);
router.get("/jobs", getJenkinsJobs); 



module.exports = router;
