const axios = require('axios');
const { JENKINS_URL, JENKINS_USER, JENKINS_API_TOKEN, JENKINS_JOB_NAME ,JENKINS_API_TOKEN2} = require('../config/dotenvConfig');

exports.runJenkinsJob = async (req, res) => {
    try {
        const { url, projetkey } = req.body;


        const jenkinsUrl = `${JENKINS_URL}/job/${JENKINS_JOB_NAME}/buildWithParameters?url=${encodeURIComponent(url)}&projetkey=${encodeURIComponent(projetkey)}`;
        console.log(jenkinsUrl) ;
        const response = await axios.post(jenkinsUrl, {}, {
            auth: {
                username: JENKINS_USER,
                password: JENKINS_API_TOKEN2
            }
        });

        console.log('Jenkins Response:', response);


        const buildUrl = response.headers.location;
        const buildNumber = buildUrl.split('/').pop();  
        console.log('Build triggered, BUILD_NUMBER:', buildNumber);

        res.json({ 
            message: "Job Jenkins déclenché avec succès", 
            status: response.status, 
            buildNumber: buildNumber  
        });


    } catch (error) {
        
    }
};


exports.getJenkinsJobs = async (req, res) => {
    try {
        const url = `${JENKINS_URL}/api/json`;
        const response = await axios.get(url, {
            auth: {
                username: JENKINS_USER,
                password: JENKINS_API_TOKEN
            }
        });

        const jobs = response.data.jobs .map(job => ({
            name: job.name,
            url: job.url,
            color: job.color 
            
        }));

        res.json({ jobs });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des jobs", details: error.response?.data || error.message });
        
    }
};

exports.getJobStatus = async (req,res)=>{
    try {

        const response = await axios.get(`${JENKINS_URL}/job/${JENKINS_JOB_NAME}/lastBuild/api/json`, {
          auth: {
            username: JENKINS_USER,
            password: JENKINS_API_TOKEN
          }
        });
  
        const jobStatus = response.data.result || "RUNNING";

        return res.json({ status: jobStatus });


      } catch (error) {
        console.error("Erreur lors de la récupération du statut Jenkins:", error.message);
        throw error;
      }
};