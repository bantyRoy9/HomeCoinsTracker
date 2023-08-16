const express = require('express');
const { saveDailyEarns,getUserDetails } = require('../Controllers/accountController');
const { protect } = require('../Controllers/authController');
const router = express.Router();

router.post('/dailyEarn',protect,getUserDetails, saveDailyEarns);


module.exports = router