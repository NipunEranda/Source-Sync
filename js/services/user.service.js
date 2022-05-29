const mysql = require('mysql2/promise');
const config = require('../../config');

exports.addUser = async (id) => {
    let connection = null;
    try {
        connection = await mysql.createConnection(config.mysql.credentials);
        const result = await connection.query(`INSERT INTO usr_User VALUES(0, ${id})`);
        return result[0].insertId;
    } catch (e) {
        console.log(e);
        return null;
    }
}

exports.getUser = async (id) => {
    let connection = null;
    try {
        connection = await mysql.createConnection(config.mysql.credentials);
        const [user] = await connection.query(`select * from usr_User where githubId = ${id}`);
        return user;
    } catch (e) {
        console.log(e);
        return null;
    }
}