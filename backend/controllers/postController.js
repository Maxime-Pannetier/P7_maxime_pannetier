const database = require("../config/db");

// AFFICHER POSTS
exports.showAllPost = (req, res, next) => {
    database.execute("SELECT posts.id,users.isAdmin, users_id, postContent,imgPost, nom, prenom FROM posts INNER JOIN users ON posts.users_id = users.id ORDER BY posts.id DESC")
        .then(([rows, fields]) => res.status(200).json({ posts: rows }))
        .catch(error => res.status(500).json({ error: error.message }));
};

// CREATION POST
exports.createPost = (req, res, next) => {
    // imgPost (présence de fichier ?)
    let imgPost = "";
    if (req.file) {
        imgPost = req.file.filename;
    }
    database.execute("INSERT INTO posts (postContent, users_id, imgPost) VALUES (?, ?, ?)", [req.body.createPost, req.currentUser.userId, imgPost])
        .then(() => res.status(201).json({ message: 'Post créé !' }))
        .catch(error => res.status(500).json({ error: error.message }));
};



// SUPPRIMER POST
exports.deletePost = (req, res, next) => {
    database.execute("SELECT * FROM posts WHERE id=?", [req.params.id])
        .then(([rows, fields]) => {
            if (req.currentUser.isAdmin === 1 || (rows.length > 0 && rows[0].users_id === req.currentUser.userId)) {
                database.execute("DELETE FROM posts WHERE id=?", [req.params.id])
                    .then(() => res.status(201).json({ message: 'Post supprimé !' }))
                    .catch(error => res.status(500).json({ error: error.message }));
            } else {
                res.status(401).json({ error: "vous ne pouvez pas" });
            }
        })
        .catch(error => res.status(500).json({ error: error.message }));
};