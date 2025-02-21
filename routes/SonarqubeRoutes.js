const express = require('express');
const { loginSonarQube ,getSonarProjets } = require('../controllers/sonarqubeController');

const router = express.Router();

router.post('/login', loginSonarQube);
router.get('/projets',getSonarProjets)

module.exports = router;
