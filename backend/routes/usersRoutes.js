const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const auth = require("../middlewares/auth");

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.delete('/:id', auth, usersController.deleteUser);

module.exports = router; 