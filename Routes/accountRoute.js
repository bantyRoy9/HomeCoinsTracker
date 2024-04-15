const express = require('express');
const { getTotalEarns, totalEarnByUser, getTotalExpend,updateDailyEarnExpend, getQuery, deletrDailyEarnExpend, saveDailyEarnExpend } = require('../Controllers/accountController');
const { protect, setUserAndGroupId } = require('../Controllers/authController');
const { addUsersActivity } = require('../Controllers/activityController');
const router = express.Router();

router.route('/getEarnExpend').get(getQuery,getTotalEarns,getTotalExpend);
router.route('/earn').get(getTotalEarns).post(protect,setUserAndGroupId('createdBy'),saveDailyEarnExpend('earn'),addUsersActivity).patch(protect,setUserAndGroupId('updatedBy'),updateDailyEarnExpend("earn"),addUsersActivity);
router.route('/earn/:id').delete(protect,deletrDailyEarnExpend('earn'),addUsersActivity);
router.route('/getEarnByUser').get(protect,totalEarnByUser);
router.route('/expend').get(getTotalExpend).post(protect,setUserAndGroupId('expendBy'),saveDailyEarnExpend('expend'),addUsersActivity).patch(protect,setUserAndGroupId('updatedBy'),updateDailyEarnExpend("expend"),addUsersActivity);
router.route('/expend/:id').delete(protect,deletrDailyEarnExpend('expend'),addUsersActivity);

module.exports = router