const express = require('express');
const { saveDailyEarns,getTotalEarns, totalEarnByUser } = require('../Controllers/accountController');
const { protect, getUserId } = require('../Controllers/authController');
const router = express.Router();

//router.route('/').get
router.route('/earn').get(getTotalEarns).post(protect,getUserId('earnBy'), saveDailyEarns);
router.route('/getEarnByUser').get(protect,totalEarnByUser);
// router.route('')
// router.post('/dailyEarn',protect,getUserIds, saveDailyEarns);


module.exports = router