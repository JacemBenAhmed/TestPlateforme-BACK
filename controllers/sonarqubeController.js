const axios = require('axios');
const { SONARQUBE_URL } = require('../config/dotenvConfig');





const loginSonarQube = async (req, res) => {
    const { login, password } = req.body;

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





const getSonarProjets = async (req, res) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ error: "Token is required" });
    }

    try {
        const response = await axios.get(`${SONARQUBE_URL}/api/projects/search`, {
            headers: { 'Authorization': authToken }
        });

        return res.json(response.data);
    } catch (error) {
        return res.status(error.response?.status || 500).json({ error: error.response?.data || "Error fetching projects" });
    }
};




module.exports = { loginSonarQube, getSonarProjets };
