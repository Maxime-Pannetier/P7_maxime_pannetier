const database = require("../config/db");

exports.createComment = (req, res, next) => {
    database.execute("INSERT INTO comments (commentsContent, user_id, post_id) VALUES (?, ?, ?)", [req.body.createComment, req.currentUser.userId, req.body.postId])
    .then(() => res.status(201).json({ message: 'Comment créé !' }))
    .catch(error => res.status(500).json({ error:error.message }));
};

exports.showAllComment = (req, res, next) => {
    database.execute("SELECT * FROM comments ORDER BY id DESC")
    .then(([rows, fields]) => res.status(200).json({ posts: rows }))
    .catch(error => res.status(500).json({ error:error.message }));
};