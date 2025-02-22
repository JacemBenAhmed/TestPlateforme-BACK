const express = require('express');
const { loginSonarQube ,getSonarProjets,createProject } = require('../controllers/sonarqubeController');

const router = express.Router();

router.post('/login', loginSonarQube);
router.get('/projets',getSonarProjets)
router.post('/create-project', createProject);

module.exports = router;
