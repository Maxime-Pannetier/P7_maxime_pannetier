const express = require('express');
const app = express();
require ("dotenv").config();

//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(express.json());
// ROUTES
const routeUsers = require('./routes/usersRoutes');

app.use("/api/user", routeUsers);


module.exports = app;
// database.execute("INSERT INTO users (userName, password, isAdmin) VALUES (?, ?, ?)", ["user1","mdp1",0])
// .then(([rows, fields]) => { console.log(rows);})
// .catch((error) => console.log(error));



// CONNEXION A LA BDD MYSQL

// database.execute("SELECT * FROM p7groupomania.users WHERE users.userName = ?;", [req.body.username])
// .then(([rows, fields]) => { console.log(rows);})
// .catch((error) => console.log(error));
// OBJET API
// objet lors require sur ce fichier (app.js)
