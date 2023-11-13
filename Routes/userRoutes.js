const express = require('express');
const { createrUser, loginUser, protect, isLoggedIn, logout, restrictTo, resetPassword, forgotPassword, sendCreateUserOtp } = require('../Controllers/authController');
const { getUserDetails,getLoginUserDetails,getUsers  } = require('../Controllers/userController');
// const { createrUser, loginUser } = require('../Controllers/userController');
const router = express.Router();

router.post('/createUser',sendCreateUserOtp);
router.post('/verifyUserOtp/:OTP',createrUser);
router.post('/loginUser', loginUser);
router.get('/logout',logout);
router.get('/getMe',isLoggedIn,getLoginUserDetails);
router.post('/forgotPassword',forgotPassword);
router.get('/resetPassword/:token',resetPassword);

router.use(protect);
router.get('/getUserDetailById', getUserDetails);

router.use(restrictTo('admin'));
router.route('/users').get(getUsers);
router.route('/users/:id').patch(getUsers)

module.exports = router
