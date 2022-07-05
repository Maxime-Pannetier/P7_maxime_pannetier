const mysql = require("mysql2/promise")

//CONNECTION A LA BDD
const dbConnections = mysql.createPool({
    host : process.env.db_host,
    user : process.env.db_user,
    password : process.env.db_password,
    database : process.env.db_database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports=dbConnections;


