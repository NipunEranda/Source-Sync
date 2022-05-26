const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const flash = require('connect-flash');
const config = require('./config');
const utils = require('./js/utils');

const axios = require('axios');

const homepage = require('./js/routes/homepage');

const app = express();

var access_token = "";

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public', {
    maxage: '1y',
}));

app.use((req, res, next) => {
    if (req.get('X-Forwarded-Proto')) {
        if ((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
            res.redirect('https://' + req.get('Host') + req.url);
        } else {
            return next();
        }
    }
    return next();
});

app.use(session({
    key: 'SID',
    secret: 'W6pTJ69hiYszSxIGXWci',
    store: new MySQLStore(config.mysql.credentials),
    resave: false,
    saveUninitialized: false,
}));

app.use(ensureSignedIn);

app.use((req, res, next) => {
    utils.log(`${req.method} ${req.url} ${req.session.username || ''}`);
    next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// setup the local variables available to all views
app.use((req, res, next) => {
    res.locals.path = req.path; // used for 404
    res.locals.username = req.session.username;
    res.locals.token = req.session.token;
    next();
});

//Routes
app.get('/signin', (req, res) => {
    res.render('signin', {
        'layout': null, // no layout for signin page
        'github_client_id': config.github.credentials.client,
    })
});

app.get('/github/callback', (req, res) => {

    // The req.query object has the query params that were sent to this route.
    const requestToken = req.query.code
    console.log(requestToken);

    axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${config.github.credentials.client}&client_secret=${config.github.credentials.secret}&code=${requestToken}`,
        // Set the content type header, so that we get the response in JSON
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        req.session.token = response.data.access_token
        res.redirect('/');
    })
})

app.get('/', homepage.get);

app.listen(config.port, () => {
    utils.log(`Server listening on port ${config.port}.`);
});

function signout(req, res) {
    req.session.username = null;
    res.redirect('/signin');
}

function ensureSignedIn(req, res, next) {
    // skip the check for the actual /signin page, duh!
    const path = req.path.toString();
    if (path === '/signin' || path === '/github/callback' || path.includes('/tokens/verify') || path.includes('/api')) {
        return next();
    }
    // if the username is set then this means they're signed in
    if (req.session.token) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect('/signin');
}