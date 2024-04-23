const express = require('express');
const { getTotalEarns, totalEarnByUser, getTotalExpend,updateDailyEarnExpend, getQuery, deletrDailyEarnExpend, saveDailyEarnExpend, getDailyEarnExpend } = require('../Controllers/accountController');
const { protect, setUserAndGroupId } = require('../Controllers/authController');
const { addUsersActivity } = require('../Controllers/activityController');
const router = express.Router();

router.use(protect);
router.route('/getEarnExpend').get(getQuery,getTotalEarns,getTotalExpend);
router.route('/earn').get(getTotalEarns).post(setUserAndGroupId('createdBy'),saveDailyEarnExpend('earn'),addUsersActivity).patch(setUserAndGroupId('updatedBy'),updateDailyEarnExpend("earn"),addUsersActivity);
router.route('/expend').get(getTotalExpend).post(setUserAndGroupId('expendBy'),saveDailyEarnExpend('expend'),addUsersActivity).patch(setUserAndGroupId('updatedBy'),updateDailyEarnExpend("expend"),addUsersActivity);

router.route('/getEarnByUser').get(totalEarnByUser);
router.route('/expend/:id').get(getDailyEarnExpend('expend')).delete(deletrDailyEarnExpend('expend'),addUsersActivity);
router.route('/earn/:id').get(getDailyEarnExpend('earn')).delete(deletrDailyEarnExpend('earn'),addUsersActivity);

module.exports = router