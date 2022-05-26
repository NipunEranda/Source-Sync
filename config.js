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
    secret: process.env.GITHUB_AUTH_SECRET
};

module.exports = config;