var pool = require('./bd');
var md5 = require('md5');
const async = require('hbs/lib/async');

async function getUser(user, password){
    try{
        var query = 'select * from usuarios1 where user = ? and password = ? limit 1';
        var rows = await pool.query(query,[user, md5(password)]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getUser};