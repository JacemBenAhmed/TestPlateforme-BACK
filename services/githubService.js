const axios = require('axios');
const querystring = require('querystring');

exports.getGitHubAccessToken = async (code) => {
    const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
    const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI;

    const response = await axios.post('https://github.com/login/oauth/access_token', querystring.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
        redirect_uri: GITHUB_REDIRECT_URI
    }), {
        headers: { 'Accept': 'application/json' }
    });

    return response.data.access_token;
};

exports.getGitHubUser = async (accessToken) => {
    const response = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    return response.data;
};
