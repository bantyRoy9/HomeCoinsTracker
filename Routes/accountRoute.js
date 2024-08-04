const express = require('express');
const { getTotalEarns, totalEarnByUser, getTotalExpend,updateDailyEarnExpend, getQuery, deletrDailyEarnExpend, saveDailyEarnExpend, getDailyEarnExpend,getAnalysisData} = require('../Controllers/accountController');
const { protect, setUserAndGroupId } = require('../Controllers/authController');
const { addUsersActivity } = require('../Controllers/activityController');
const router = express.Router();

router.use(protect)
router.route('/getEarnByUser').get(totalEarnByUser);
router.route('/getAnalysisData').get(getQuery,getAnalysisData);
router.route('/getEarnExpend').get(getQuery,getTotalEarns,getTotalExpend);
router.route('/earn').get(getDailyEarnExpend('earn')).post(setUserAndGroupId('createdBy'),saveDailyEarnExpend('earn'),addUsersActivity).patch(setUserAndGroupId('updatedBy'),updateDailyEarnExpend("earn"),addUsersActivity);
router.route('/earn/:id').get(getDailyEarnExpend('earn')).delete(deletrDailyEarnExpend('earn'),addUsersActivity);
router.route('/expend').get(getDailyEarnExpend('expend')).post(setUserAndGroupId('expendBy'),saveDailyEarnExpend('expend'),addUsersActivity).patch(setUserAndGroupId('updatedBy'),updateDailyEarnExpend("expend"),addUsersActivity);
router.route('/expend/:id').get(getDailyEarnExpend('expend')).delete(deletrDailyEarnExpend('expend'),addUsersActivity);

module.exports = router