const express = require('express');
const { runJenkinsJob,getJenkinsJobs ,getJobStatus, getReportSnyk,runJenkinsDastJob,getJobDastStatus } = require('../controllers/jenkinsController');

const router = express.Router();

router.post('/run-job', runJenkinsJob);
router.post('/run-dast-job', runJenkinsDastJob);

router.get("/jobs", getJenkinsJobs); 
router.get('/statusJob',getJobStatus) ;
router.get('/statusDastJob',getJobDastStatus) ;
router.get('/getSnykReport',getReportSnyk);


module.exports = router;
