const mysql = require('mysql2');
// Connect to database
function createConnection(){
    return mysql.createConnection(
        {
            host: 'localhost',
            user: 'root', // MySQL username,
            password: '', // MySQL password
            database: 'MehakLLC'
        },
    );
}
module.exports = createConnection;