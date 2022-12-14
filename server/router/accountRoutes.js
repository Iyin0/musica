const express = require("express");
const router = express.Router();
const account = require('../controller/accountController');

router.post("/signup", account.signupUser)
router.post("/login", account.loginUser)
router.get("/", account.getUser)


module.exports = router