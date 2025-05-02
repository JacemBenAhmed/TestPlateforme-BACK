const axios = require('axios');

exports.getAllRepositories = async (req, res) => {
    const { username } = req.query;
    const url = `https://api.github.com/users/${username}/repos`;
    console.log(url) ;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des dépôts.' });
    }
};
 