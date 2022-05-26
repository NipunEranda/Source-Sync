const config = {};
config.mysql = {};

// General
config.port = process.env.PORT || 8081;

config.mysql.credentials = {
    'host': process.env.MYSQL_HOSTNAME,
    'user': process.env.MYSQL_USERNAME,
    'password': process.env.MYSQL_PASSWORD,
    'database': process.env.MYSQL_DATABASE,
};

module.exports = config;