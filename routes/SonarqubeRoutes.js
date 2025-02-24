const express = require('express');
const { loginSonarQube ,getSonarProjets,createProject ,getProjectAnalyses,getSonarAnalysis,getSonarIssues,isPassed,getSeverityCount} = require('../controllers/sonarqubeController');

const router = express.Router();

router.post('/login', loginSonarQube);
router.get('/projets',getSonarProjets)
router.post('/create-project', createProject);
router.get('/project-analyses', getProjectAnalyses);
router.get('/analysis', getSonarAnalysis);
router.get('/issues',getSonarIssues) ;
router.get('/isPassed',isPassed) ;
router.get('/severity-count', getSeverityCount);



module.exports = router;
