const express = require("express");
const router = express.Router();
const account = require('../controller/accountController');
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth) //  require auth for all routes
router.get("/", account.getUser)


module.exports = router