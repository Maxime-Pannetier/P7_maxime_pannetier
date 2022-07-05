const database = require("../config/db");


// CREATION COMMENTAIRE
exports.createComment = (req, res, next) => {
    database.execute("INSERT INTO comments (commentsContent, user_id, post_id) VALUES (?, ?, ?)", [req.body.createComment, req.currentUser.userId, req.body.postId])
        .then(() => res.status(201).json({ message: 'Comment créé !' }))
        .catch(error => res.status(500).json({ error: error.message }));
};

// AFFICHER LES COMMENTAIRES
exports.showAllComment = (req, res, next) => {
    database.execute("SELECT comments.id, user_id, commentsContent, nom, prenom, post_id FROM comments  INNER JOIN users ON comments.user_id = users.id WHERE post_id = ? ORDER BY comments.id ASC", [req.params.postId])
        .then(([rows, fields]) => res.status(200).json({ comments: rows }))
        .catch(error => res.status(500).json({ error: error.message }));
};

// SUPPRIMER COMMENTAIRE
exports.deleteComment = (req, res, next) => {
    database.execute("SELECT * FROM comments WHERE id=?", [req.params.id])
        .then(([rows, fields]) => {
            console.log(rows[0]);
            console.log(req.currentUser);
            if (req.currentUser.isAdmin === 1 || (rows.length > 0 && rows[0].user_id === req.currentUser.userId)) {
                database.execute("DELETE FROM comments WHERE id=?", [req.params.id])
                    .then(() => res.status(201).json({ message: 'Comment supprimé !' }))
                    .catch(error => res.status(500).json({ error: error.message }));
            } else {
                res.status(401).json({ error: "vous ne pouvez pas" });
            }
        })
        .catch(error => res.status(500).json({ error: error.message }));
};
