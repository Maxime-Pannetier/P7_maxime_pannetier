const database = require("../config/db");

exports.createPost = (req, res, next) => {
    // console.log("content", req.body.postContent);
    // console.log("userId", req.currentUser);
    database.execute("INSERT INTO posts (postContent, users_id) VALUES (?, ?)", [req.body.postContent, req.currentUser.userId])
    .then(() => res.status(201).json({ message: 'Post créé !' }))
    .catch(error => res.status(500).json({ error:error.message }));
}

exports.showAllPost = (req, res, next) => {
    database.execute("SELECT * FROM posts ORDER BY id DESC")
    .then(([rows, fields]) => res.status(200).json({ posts: rows }))
    .catch(error => res.status(500).json({ error:error.message }));
}

// exports.deletePost = (req, res, next) => {
//     database.execute("DELETE FROM posts")
// }