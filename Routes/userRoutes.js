const express = require('express');
const { createrUser, loginUser, protect, isLoggedIn } = require('../Controllers/authController');
const { getUserDetails,getLoginUserDetails  } = require('../Controllers/userController');
// const { createrUser, loginUser } = require('../Controllers/userController');
const router = express.Router();

router.post('/createUser', createrUser);
router.post('/loginUser', loginUser);
router.get('/getUserDetailById', protect , getUserDetails);
router.get('/getMe',isLoggedIn,getLoginUserDetails)

module.exports = router
