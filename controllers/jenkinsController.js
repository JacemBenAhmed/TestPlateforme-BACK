const axios = require('axios');
const { JENKINS_URL, JENKINS_USER, JENKINS_API_TOKEN, JENKINS_JOB_NAME ,JENKINS_API_TOKEN2} = require('../config/dotenvConfig');

exports.runJenkinsJob = async (req, res) => {
    try {
        const url = `${JENKINS_URL}/job/${JENKINS_JOB_NAME}/build`;
        console.log(url) ;
        const response = await axios.post(url, {}, {
            auth: {
                username: JENKINS_USER,
                password: JENKINS_API_TOKEN2
            }
        });

        res.json({ message: "Job Jenkins déclenché avec succès", status: response.status });
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