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
        return null;
    }
}

exports.getOrgRepositories = async (org) => {
    let response = null;
    try {
        response = await axios.get(`${config.github.api.url}/orgs/${org}/repos`, { headers: { Authorization: 'token ' + config.github.credentials.token, Accept: 'application/vnd.github.v3+json' } });
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

exports.getPersonalRepositories = async () => {
    let response = null;
    try {
        response = await axios.get(`${config.github.api.url}/user/repos?visibility=all&per_page=100`, { headers: { Authorization: 'token ' + config.github.credentials.token, Accept: 'application/vnd.github.v3+json' } });
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

exports.getLanguagesInRepository = async (link) => {
    let response = null;
    try{
        response = await axios.get(link, { headers: { Authorization: 'token ' + config.github.credentials.token, Accept: 'application/vnd.github.v3+json' } });
        return response.data;
    }catch(e){
        console.log(e);
        return null;
    }
}