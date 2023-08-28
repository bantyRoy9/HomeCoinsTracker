const express = require('express');
const { saveDailyEarns,getUserIds,getTotalEarns, totalEarnByUser } = require('../Controllers/accountController');
const { protect } = require('../Controllers/authController');
const router = express.Router();

router.route('/earn').get(getTotalEarns).post(protect,getUserIds, saveDailyEarns);
router.route('/getEarnByUser').get(protect,totalEarnByUser);
// router.route('')
// router.post('/dailyEarn',protect,getUserIds, saveDailyEarns);


module.exports = router