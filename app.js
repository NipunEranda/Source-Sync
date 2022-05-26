const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const flash = require('connect-flash');
const config = require('./config');
const utils = require('./js/utils');

const app = express();

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public', {
    maxage: '1y',
}));

app.use((req, res, next) => {
    if (req.get('X-Forwarded-Proto')) { // 'X-Forwarded-Proto' is only added at AWS
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

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    res.locals.path = req.path; // used for 404
    res.locals.username = req.session.username;
    next();
});

app.listen(config.port, () => {
    utils.log(`Server listening on port ${config.port}.`);
});

function signout(req, res) {
    req.session.username = null;
    res.redirect('/signin');
}