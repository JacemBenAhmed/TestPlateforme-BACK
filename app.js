const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 


const authRoutes = require('./routes/SonarqubeRoutes');
const jenkinsRoutes = require('./routes/jenkinsRoutes');
const githubRoutes = require('./routes/githubRoutes');
const reportRoutes = require("./routes/reportRoutes");

const app = express();


mongoose.connect('mongodb://localhost:27017/testyDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('MongoDB connecté avec succès ✅');
    })
    .catch((err) => {
      console.error('Erreur de connexion à MongoDB:', err);
    });


app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/jenkins', jenkinsRoutes);
app.use('/api',githubRoutes) ;
app.use('/api',reportRoutes) ;



module.exports = app;
