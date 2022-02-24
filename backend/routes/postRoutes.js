const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");

router.post('/createPost',auth, postController.createPost);
router.get('/showAllPost',auth, postController.showAllPost);

module.exports = router; 