const express = require('express');
const { createUser,verifyCreatedUserOTP, loginUser, protect, isLoggedIn, logout, restrictTo, resetPassword, forgotPassword,sendOTP } = require('../Controllers/authController');
const { getUserDetails,getLoginUserDetails,getUsers  } = require('../Controllers/userController');
// const { verifyCreatedUserOTP, loginUser } = require('../Controllers/userController');
const router = express.Router();

router.post('/createUser',createUser);
router.post('/verifyUserOtp/:OTP',verifyCreatedUserOTP);
router.post('/loginUser', loginUser);
router.get('/logout',logout);
router.get('/getMe',isLoggedIn,getLoginUserDetails);
router.post('/forgotPassword',forgotPassword);
router.get('/resetPassword/:token',resetPassword);

router.use(protect);
router.get('/getUserDetailById', getUserDetails);
router.post('/sendOTP',sendOTP);

router.use(restrictTo('admin'));
router.route('/users').get(getUsers);
router.route('/users/:id').patch(getUsers)

module.exports = router
