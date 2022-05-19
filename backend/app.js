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
const routePosts = require('./routes/postRoutes');
const routeComments = require('./routes/commentRoutes');

app.use("/api/user", routeUsers);
app.use("/api/posts", routePosts);
app.use("/api/comment", routeComments);


module.exports = app;