const axios = require('axios');
const config = require('../../config');

exports.getUserDetails = async (req, res) => {
    let response = null;
    try {
        response = await axios.get(`${config.github.api.url}/user`, { headers: { Authorization: 'token ' + config.github.credentials.token } });
        return response.data;
    } catch (e) {
        console.log(e);
        return e;
    }
}

exports.getOrganizations = async (req, res) => {
    let response = null;
    try {
        response = await axios.get(`${config.github.api.url}/user/orgs`, { headers: { Authorization: 'token ' + config.github.credentials.token, Accept: 'application/vnd.github.v3+json' } });
        return response.data;
    } catch (e) {
        console.log(e);
        return e;
    }
}

exports.getRepositories = async (org) => {
    let response = null;
    try {
        console.log(`${config.github.api.url}/orgs/${org}/repos`);
        response = await axios.get(`${config.github.api.url}/orgs/${org}/repos`, { headers: { Authorization: 'token ' + config.github.credentials.token, Accept: 'application/vnd.github.v3+json' } });
        console.log(response);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}