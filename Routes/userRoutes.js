const express = require('express');
const { createrUser, loginUser, protect, isLoggedIn, logout, restrictTo, resetPassword, forgetPassword } = require('../Controllers/authController');
const { getUserDetails,getLoginUserDetails,getUsers  } = require('../Controllers/userController');
// const { createrUser, loginUser } = require('../Controllers/userController');
const router = express.Router();

router.post('/createUser', createrUser);
router.post('/loginUser', loginUser);
router.get('/logout',logout);
router.get('/getMe',isLoggedIn,getLoginUserDetails);
router.post('/forgetPassword',forgetPassword)

router.use(protect);
router.get('/getUserDetailById', getUserDetails);

router.use(restrictTo('admin'));
router.route('/users').get(getUsers);
router.route('/users/:id').patch(getUsers)

module.exports = router
