const express = require('express');
const { saveDailyEarns,getUserIds } = require('../Controllers/accountController');
const { protect } = require('../Controllers/authController');
const router = express.Router();

router.post('/dailyEarn',protect,getUserIds, saveDailyEarns);


module.exports = router