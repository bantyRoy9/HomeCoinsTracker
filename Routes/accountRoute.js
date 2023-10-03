const express = require('express');
const { saveDailyEarns, getTotalEarns, totalEarnByUser, getTotalExpend, saveDailyExped, getQuery } = require('../Controllers/accountController');
const { protect, getUserId } = require('../Controllers/authController');
const router = express.Router();

router.route('/getEarnExpend').get((req, res, next) => { console.log('/getEarnExpend'); next(); }, getQuery, getTotalEarns, getTotalExpend)
router.route('/earn').get((req, res, next) => { console.log('/earn'); next(); }, getTotalEarns).post(protect, getUserId('earnBy'), saveDailyEarns);
router.route('/getEarnByUser').get((req, res, next) => { console.log('/getEarnExpend'); next(); }, protect, totalEarnByUser);
router.route('/expend').get((req, res, next) => { console.log('/expend'); next(); }, getTotalExpend).post((req, res, next) => { console.log('/getEarnExpend'); next(); }, protect, getUserId('expendBy'), saveDailyExped);


module.exports = router