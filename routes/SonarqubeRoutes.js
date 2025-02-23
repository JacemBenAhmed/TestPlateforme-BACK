const express = require('express');
const { loginSonarQube ,getSonarProjets,createProject ,getProjectAnalyses,getSonarAnalysis,getSonarIssues} = require('../controllers/sonarqubeController');

const router = express.Router();

router.post('/login', loginSonarQube);
router.get('/projets',getSonarProjets)
router.post('/create-project', createProject);
router.get('/project-analyses', getProjectAnalyses);
router.get('/analysis', getSonarAnalysis);
router.get('/issues',getSonarIssues) ;




module.exports = router;
