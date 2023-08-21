const express = require('express');
const { saveDailyEarns,getUserIds,getTotalEarns } = require('../Controllers/accountController');
const { protect } = require('../Controllers/authController');
const router = express.Router();

router.route('/earn').get(getTotalEarns).post(protect,getUserIds, saveDailyEarns);
// router.post('/dailyEarn',protect,getUserIds, saveDailyEarns);


module.exports = router