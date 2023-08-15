const express = require('express');
const { createrUser, loginUser } = require('../Controllers/authController');
// const { createrUser, loginUser } = require('../Controllers/userController');
const router = express.Router();

router.post('/createUser', createrUser);
router.post('/loginUser', loginUser);

module.exports = router
