const axios = require('axios');
const config = require('../../config');
const homepage = require('./homepage');

const signIn = (req, res) => {
    res.render('signin', {
        'layout': null, // no layout for signin page
        'github_client_id': config.github.credentials.client,
    })
}

const signInCallBack = (req, res) => {

    // The req.query object has the query params that were sent to this route.
    const requestToken = req.query.code
    console.log(requestToken);

    axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${config.github.credentials.client}&client_secret=${config.github.credentials.secret}&code=${requestToken}`,
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        req.session.token = response.data.access_token
        res.redirect('/');
    })
}

function signout(req, res) {
    req.session.token = null;
    res.redirect('/signin');
}

const routes = () => {
    return {
        get: {
            '/': homepage.get,
            '/signin': signIn,
            '/github/callback': signInCallBack,
            '/signout': (req, res) => signout(req, res)
        },
        post: {

        },
        put: {

        },
        delete: {

        }
    };
}

module.exports = routes;