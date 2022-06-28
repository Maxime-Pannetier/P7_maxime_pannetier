const mysql = require("mysql2/promise")

//CONNECTION A LA BDD
const dbConnections = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'P@nd@94BkK-25',
    database : "p7groupomania",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports=dbConnections;


