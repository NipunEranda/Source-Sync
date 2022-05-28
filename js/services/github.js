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
    try{
        response = await axios.get(`${config.github.api.url}/user/orgs`, { headers: { Authorization: 'token ' + config.github.credentials.token } });
        return response.data;
    }catch(e){
        console.log(e);
        return e;
    }
}