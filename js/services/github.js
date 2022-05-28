const axios = require('axios');

exports.getUserDetails = async(req, res) => {
    const config = {
        headers: {
            Authorization: 'token ' + req.session.token
        }
    }
    const response = await axios.get('https://api.github.com/user', config);
    return response.data;
}