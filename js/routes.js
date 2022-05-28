const homepage = require('./routes/homepage');
const user = require('./routes/user');
const profile = require('./routes/profile');
const organizations = require('./routes/organizations');
const repositories = require('./routes/repositories');

const routes = () => {
    return {
        get: {
            '/': homepage.get,
            '/signin': user.signIn,
            '/github/callback': user.signInCallBack,
            '/signout': user.signout,
            '/profile': profile.get,
            '/repositories': repositories.get,
            '/organizations': organizations.get,
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