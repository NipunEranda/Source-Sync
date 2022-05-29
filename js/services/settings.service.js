const mysql = require('mysql2/promise');
const config = require('../../config');

exports.addSettings = async (userId) => {
    let connection = null;
    try {
        connection = await mysql.createConnection(config.mysql.credentials);
        await connection.query(`INSERT INTO usr_Settings VALUES(0, ${userId}, null, null, null, null, null, null)`);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

exports.save = async (settings) => {

};