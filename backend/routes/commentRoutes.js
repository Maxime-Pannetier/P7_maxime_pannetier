const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentsController");
const auth = require("../middlewares/auth");

router.post('/createComment',auth, commentController.createComment);
// router.get('/showAllComments',auth, commentController.showAllComments);

module.exports = router;  