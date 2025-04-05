const axios = require('axios');
const { SONARQUBE_URL ,SONARQUBE_TOKEN } = require('../config/dotenvConfig');





const loginSonarQube = async (req, res) => {
    //const { login, password } = req.body;

    login = "admin" ;
    password = "Jacem1022003." ;

    if (!login || !password) {
        return res.status(400).json({ error: "Login and password are required" });
    }

    try {
        const auth = Buffer.from(`${login}:${password}`).toString('base64');

        const response = await axios.get(`${SONARQUBE_URL}/api/authentication/validate`, {
            headers: { 'Authorization': `Basic ${auth}` }
        });

        if (response.data.valid) {
            return res.json({ message: "Login successful", authToken: auth });
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Authentication failed", details: error.response?.data || error.message });
    }
};


const createProject = async (req, res) => {
    const { name, project } = req.body;
    const authToken = req.query.authToken;

    if (!name || !project) {
        return res.status(400).json({ error: 'Name and project key are required' });
    }

    const params = new URLSearchParams({ name, project });

    try {
        const response = await axios.post(
            `${SONARQUBE_URL}/api/projects/create`,  
            params.toString(),
            {
                headers: {
                    'Authorization': `Basic ${authToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        res.status(201).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: error.response?.data || 'Internal Server Error'
        });
    }
};



const getSonarProjets = async (req, res) => {
    //const authToken = req.headers.authorization;
    const authToken = req.query.authToken;

    console.log(authToken) ;

    if (!authToken) {
        return res.status(401).json({ error: "Token is required" });
    }

    try {
        const response = await axios.get(`${SONARQUBE_URL}/api/projects/search`, {
            headers: { 'Authorization': `Basic ${authToken}` }
        });

        return res.json(response.data);
    } catch (error) {
        return res.status(error.response?.status || 500).json({ error: error.response?.data || "Error fetching projects" });
    }
};



const getProjectAnalyses = async (req, res) => {
    const { project } = req.query;
    //const authToken = req.headers.authorization;
    const authToken = req.query.authToken ;

    

    if ( !authToken) {
        return res.status(400).json({ error: 'Project key and authToken are required' });
    }
        
    try {
        const response = await axios.get(`${SONARQUBE_URL}/api/project_analyses/search`, {
            params: { project },
            headers: { 'Authorization': `Basic ${authToken}` }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching project analyses:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal Server Error' });
    }
};


async function getSonarAnalysis(req, res) {
    const { projectKey } = req.query;
   // const authToken = req.headers.authorization;
    const authToken = req.query.authToken;

    console.log(`Requête envoyée à : ${SONARQUBE_URL}/api/measures/component?component=${projectKey}&metricKeys=coverage,ncloc,complexity,violations`);


    if (!projectKey) {
        return res.status(400).json({ error: 'Project key is required' });
    }



    try {
      const response = await axios.get(`${SONARQUBE_URL}/api/measures/component`, {
        params: {
          component: projectKey, 
          metricKeys: 'coverage,ncloc,complexity,violations' 
        },
        headers: { 'Authorization': `Basic ${authToken}` }
    });
  
      res.json(response.data);
    } catch (error) {
      console.error('Erreur SonarQube:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des données d’analyse' });
    }
  } ;



  //TEST ISSUES : WORKS
  async function getSonarIssues(req, res) {

    const { componentKeys } = req.query;
    const authToken = req.headers.authorization;


    if (!componentKeys) {
        return res.status(400).json({ error: 'componentKeys is required' });
    }



    try {
      const response = await axios.get(`${SONARQUBE_URL}/api/issues/search`, {
        params: {
            componentKeys: componentKeys, 
            severities: 'MAJOR' 
        },
        headers: { 'Authorization': `Basic ${authToken}` }
      });
  
      res.json(response.data);
    } catch (error) {
      console.error('Erreur SonarQube:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des données d’analyse' });
    }
  }


  async function isPassed(req,res) {

    const {projectKey} = req.query ;
    //const authToken = req.headers.authorization;
    const authToken = req.query.authToken;



    if(!projectKey)
    {
        return res.status(400).json({ error: 'componentKeys is required' });
    }
    try {
        const response = await axios.get(`${SONARQUBE_URL}/api/qualitygates/project_status`, {
          params: {
              projectKey: projectKey
             
          },
          headers: { 'Authorization': `Basic ${authToken}` }
        });
    
        res.json(response.data);
      } catch (error) {
        console.error('Erreur SonarQube:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des données d’analyse' });
      }

  }
  

  // COUNT SEVERITY --

 async function getSeverityCount(req,res) {
    try {
        const {componentKeys} = req.query ;
        const authToken = req.headers.authorization;

            if(!componentKeys)
            {
                return res.status(400).json({ error: 'componentKeys is required' });

            }

        const severities = ['BLOCKER', 'CRITICAL', 'MAJOR', 'MINOR', 'INFO'];
        let severityCounts = {};

        for (let severity of severities) {
            const response = await axios.get(`${SONARQUBE_URL}/api/issues/search`, {
                params: {
                    componentKeys: componentKeys,
                    severities: severity,
                    ps: 1, 
                },
                headers: { 'Authorization': authToken }
            });

            severityCounts[severity.toLowerCase()] = response.data.total;
        }

        res.json(severityCounts);
    } catch (error) {
        console.error('Erreur lors de la récupération des données SonarQube', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};




const getOrgProjectsStats = async (req, res) => {
    const authToken = req.headers.authorization;


    
    try {
        const response = await axios.get(`${SONARQUBE_URL}/api/organizations/projects`, {
            headers: { 'Authorization': authToken }       });

        res.json(response.data.projects);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des projets" });
    }
};
  



module.exports = { loginSonarQube, getSonarProjets ,createProject,getProjectAnalyses ,getSonarAnalysis,getSonarIssues,isPassed,getSeverityCount,getOrgProjectsStats};
