const database = require("../config/db");

exports.createPost = (req, res, next) => {
    database.execute("INSERT INTO posts (postContent, users_id) VALUES (?, ?)", [req.body.createPost, req.currentUser.userId])
    .then(() => res.status(201).json({ message: 'Post créé !' }))
    .catch(error => res.status(500).json({ error:error.message }));
};

exports.showAllPost = (req, res, next) => {
    database.execute("SELECT posts.id, postContent, nom, prenom FROM posts INNER JOIN users ON posts.users_id = users.id")
    .then(([rows, fields]) => res.status(200).json({ posts: rows }))
    .catch(error => res.status(500).json({ error:error.message }));
};