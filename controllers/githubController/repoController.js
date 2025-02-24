const axios = require('axios');


exports.getAllRepositories = async (req, res) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ error: "Token is required" });
    }

    try {
        const response = await axios.get('https://api.github.com/user/repos', {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });

        return res.json(response.data);
    } catch (error) {
        console.error('Error fetching repositories', error);
        return res.status(500).json({ error: "Error fetching repositories" });
    }
};