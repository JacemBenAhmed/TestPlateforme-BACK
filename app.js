const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/SonarqubeRoutes');
const jenkinsRoutes = require('./routes/jenkinsRoutes');
const githubRoutes = require('./routes/githubRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/jenkins', jenkinsRoutes);
app.use('/api',githubRoutes) ;




module.exports = app;
