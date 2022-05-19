const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");

router.post('/',auth, postController.createPost);
router.get('/',auth, postController.showAllPost);

module.exports = router;  