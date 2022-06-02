const express = require("express");
const router = express.Router();


const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");
const multer = require('../middlewares/multer-config');

router.post('/',auth, multer, postController.createPost);
router.get('/',auth, postController.showAllPost);
router.delete('/:id', auth, postController.deletePost );
module.exports = router;  