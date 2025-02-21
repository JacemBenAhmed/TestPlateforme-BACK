const axios = require('axios');
const { JENKINS_URL, JENKINS_USER, JENKINS_API_TOKEN, JENKINS_JOB_NAME } = require('../config/dotenvConfig');

exports.runJenkinsJob = async (req, res) => {
    try {
        const url = `${JENKINS_URL}/job/${JENKINS_JOB_NAME}/build?token=${JENKINS_API_TOKEN}`;


        const response = await axios.post(url, {}, {
            auth: {
                username: JENKINS_USER,
                password: JENKINS_API_TOKEN
            }
        });

        res.json({ message: "Job Jenkins déclenché avec succès", status: response.status });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors du déclenchement du job", details: error.response?.data || error.message });
    }
};
