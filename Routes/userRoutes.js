const express = require('express');
const { createrUser, loginUser, protect } = require('../Controllers/authController');
const { getUserDetails  } = require('../Controllers/userController');
// const { createrUser, loginUser } = require('../Controllers/userController');
const router = express.Router();

router.post('/createUser', createrUser);
router.post('/loginUser', loginUser);
router.get('/getUserDetailById', protect , getUserDetails)

module.exports = router
