const axios = require('axios');
const querystring = require('querystring');
const jwt = require('jsonwebtoken');
const { getGitHubAccessToken, getGitHubUser } = require('../../services/githubService');

exports.redirectToGitHub = (req, res) => {
    const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI;
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=user`;
    res.redirect(githubAuthUrl);
};

exports.githubCallback = async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send('Code is required');
    }

    try {
        const accessToken = await getGitHubAccessToken(code);
        const user = await getGitHubUser(accessToken);

        const token = jwt.sign({ userId: user.id, username: user.login }, process.env.JWT_SECRET, { expiresIn: '1h' });
       

        res.redirect(`http://localhost:5173/?token=${token}&username=${user.login}`);
    } catch (error) {
        console.error('Erreur lors de l\'authentification avec GitHub', error);
        res.status(500).send('Erreur interne du serveur');
    }
};
