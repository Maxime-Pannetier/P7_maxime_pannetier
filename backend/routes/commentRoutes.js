const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentsController");
const auth = require("../middlewares/auth");

router.post('/',auth, commentController.createComment);
router.get('/',auth, commentController.showAllComment);

module.exports = router;  