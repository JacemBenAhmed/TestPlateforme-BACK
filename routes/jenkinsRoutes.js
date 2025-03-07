const express = require('express');
const { runJenkinsJob,getJenkinsJobs ,getJobStatus } = require('../controllers/jenkinsController');

const router = express.Router();

router.post('/run-job', runJenkinsJob);
router.get("/jobs", getJenkinsJobs); 
router.get('/statusJob',getJobStatus) ;



module.exports = router;
