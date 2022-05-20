const database = require("../config/db");

exports.createComment = (req, res, next) => {
    database.execute("INSERT INTO comments (commentsContent, user_id, post_id) VALUES (?, ?, ?)", [req.body.createComment, req.currentUser.userId, req.body.postId])
    .then(() => res.status(201).json({ message: 'Comment créé !' }))
    .catch(error => res.status(500).json({ error:error.message }));
};

exports.showAllComment = (req, res, next) => {
    database.execute("SELECT comments.id, commentsContent, nom, prenom, post_id FROM comments INNER JOIN users ON comments.user_id = users.id INNER JOIN posts ON comments.post_id = posts.id ORDER BY comments.id DESC")
    .then(([rows, fields]) => res.status(200).json({ comments: rows }))
    .catch(error => res.status(500).json({ error:error.message }));
};
