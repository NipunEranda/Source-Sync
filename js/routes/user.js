const axios = require('axios');
const config = require('../../config');
const github = require('../services/github.service');
const user = require('../services/user.service');
const settings = require('../services/settings.service');

exports.signIn = (req, res) => {
    res.render('signin', {
        'layout': null, // no layout for signin page
        'github_client_id': config.github.credentials.client,
    })
}

exports.signInCallBack = async (req, res) => {
    const requestToken = req.query.code;
    try {
        const response = await axios({
            method: 'post',
            url: `https://github.com/login/oauth/access_token?client_id=${config.github.credentials.client}&client_secret=${config.github.credentials.secret}&code=${requestToken}`,
            headers: {
                accept: 'application/json'
            }
        });
        const u = await github.getUserDetails(req, res);
        const existingUser = await user.getUser(u.id);
        if (existingUser.length === 0) {
            const userId = await user.addUser(u.id);
            await settings.addSettings(userId);
        }
        req.session.token = response.data.access_token;
        req.session.user = u;
        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.redirect('/');
    }
}

exports.signout = (req, res) => {
    req.session.token = null;
    res.redirect('/signin');
}