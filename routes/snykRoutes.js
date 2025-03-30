const express = require('express');
const router = express.Router();
const snykController = require('../controllers/snykController');

router.get('/snyk/orgs', snykController.getOrganizations);
router.get('/snyk/projects', snykController.getProjects);
router.get('/snyk/issues', snykController.getProjectIssues);
router.get('/scan', runSnykScan);
router.get('/generate-report', generateSnykHtmlReport);

module.exports = router;
