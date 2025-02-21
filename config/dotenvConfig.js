require('dotenv').config();

module.exports = {
    SONARQUBE_URL: process.env.SONARQUBE_URL ,
    PORT: process.env.PORT  ,
    JENKINS_URL:process.env.JENKINS_URL,
    JENKINS_API_TOKEN:process.env.JENKINS_API_TOKEN,
    JENKINS_JOB_NAME:process.env.JENKINS_API_NAME,
    JENKINS_USER:process.env.JENKINS_USER
};
