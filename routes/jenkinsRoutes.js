const express = require('express');
const { runJenkinsJob,getJenkinsJobs ,getJobStatus, getReportSnyk } = require('../controllers/jenkinsController');

const router = express.Router();

router.post('/run-job', runJenkinsJob);
router.get("/jobs", getJenkinsJobs); 
router.get('/statusJob',getJobStatus) ;
router.get('/getSnykReport',getReportSnyk);


module.exports = router;
