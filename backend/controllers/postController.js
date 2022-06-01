const database = require("../config/db");


exports.createPost = (req, res, next) => {
    let imgPost = "";
    if (req.file){
        imgPost = req.file.filename;
        console.log(req.file.filename);
    }
        
    database.execute("INSERT INTO posts (postContent, users_id, imgPost) VALUES (?, ?, ?)", [req.body.createPost, req.currentUser.userId, imgPost])
        .then(() => res.status(201).json({ message: 'Post créé !' }))

        .catch(error => res.status(500).json({ error: error.message }));
};

exports.showAllPost = (req, res, next) => {
    database.execute("SELECT posts.id, postContent,imgPost, nom, prenom FROM posts INNER JOIN users ON posts.users_id = users.id")
        .then(([rows, fields]) => res.status(200).json({ posts: rows }))
        .catch(error => res.status(500).json({ error: error.message }));
};