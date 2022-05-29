const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const flash = require('connect-flash');
const config = require('./config');
const utils = require('./js/utils');
const routes = require('./js/routes');

const app = express();

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
    secret: 'W13DK24lwnzaqhLBDYde',
    store: new MySQLStore(config.mysql.credentials),
    resave: false,
    saveUninitialized: false,
}));

app.use(ensureSignedIn);
app.use(flash());

app.use((req, res, next) => {
    utils.log(`${req.method} ${req.url} ${req.session.username || ''}`);
    next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// setup the local variables available to all views
app.use((req, res, next) => {
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    res.locals.path = req.path; // used for 404
    res.locals.user = req.session.user;
    res.locals.token = req.session.token;
    next();
});

//Routes
Object.keys(routes()).forEach(route => {
    Object.keys(routes()[route]).forEach(r => {
        if(route === 'get')
            app.get(r, routes()[route][r]);
        else if(route === 'post')
            app.post(r, routes()[route][r]);
        else if(route === 'put')
            app.put(r, routes()[route][r]);
        else
            app.delete(r, routes()[route][r]);
    });
});

// Object.keys(routes.post()).forEach(route => {
//     app.post(route, routes.post()[route]);
// });

// Object.keys(routes.put()).forEach(route => {
//     app.put(route, routes.put()[route]);
// });

// Object.keys(routes.delete()).forEach(route => {
//     app.delete(route, routes.delete()[route]);
// });

app.listen(config.port, () => {
    utils.log(`Server listening on port ${config.port}.`);
});

//Check if user loggedIn or not
function ensureSignedIn(req, res, next) {
    const path = req.path.toString();
    if (path === '/signin' || path === '/github/callback' || path.includes('/tokens/verify') || path.includes('/api')) {
        return next();
    }
    if (req.session.token) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect('/signin');
}