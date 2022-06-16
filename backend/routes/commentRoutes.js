const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentsController");
const auth = require("../middlewares/auth");

router.post('/',auth, commentController.createComment);
router.get('/:postId',auth, commentController.showAllComment);
router.delete('/:id', auth, commentController.deleteComment );

module.exports = router;  