const express = require("express");
const router = express.Router();
const account = require('../controller/accountController');
const multer = require('multer');
const upload = multer();

router.post("/signup", account.signupUser)
router.post("/login", account.loginUser)


module.exports = router