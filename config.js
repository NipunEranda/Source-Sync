const config = {};
config.mysql = {};
config.github = {};

// General
config.port = process.env.PORT || 3000;

//MYSQL
config.mysql.credentials = {
    'host': process.env.MYSQL_HOSTNAME,
    'user': process.env.MYSQL_USERNAME,
    'password': process.env.MYSQL_PASSWORD,
    'database': process.env.MYSQL_DATABASE,
};

//GITHUB AUTH
config.github.credentials = {
    client: process.env.GITHUB_AUTH_CLIENT,
    secret: process.env.GITHUB_AUTH_SECRET,
    token: process.env.GITHUB_TOKEN
};

config.github.api = {
    url: process.env.GITHUB_API_URL
}

module.exports = config;