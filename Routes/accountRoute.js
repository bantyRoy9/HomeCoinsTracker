const express = require('express');
const { saveDailyEarns,getTotalEarns, totalEarnByUser,getTotalExpend,saveDailyExped,getQuery } = require('../Controllers/accountController');
const { protect, getUserId } = require('../Controllers/authController');
const router = express.Router();

router.route('/getEarnExpend').get(getQuery,getTotalEarns,getTotalExpend)
router.route('/earn').get(getTotalEarns).post(protect,getUserId('earnBy'), saveDailyEarns);
router.route('/getEarnByUser').get(protect,totalEarnByUser);
router.route('/expend').get(getTotalExpend).post(protect,getUserId('expendBy'), saveDailyExped);
// router.route('')


module.exports = router