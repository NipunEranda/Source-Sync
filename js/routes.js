const homepage = require('./routes/homepage');
const user = require('./routes/user');
const profile = require('./routes/profile');

const routes = () => {
    return {
        get: {
            '/': homepage.get,
            '/signin': user.signIn,
            '/github/callback': user.signInCallBack,
            '/signout': user.signout,
            '/profile': profile.get
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