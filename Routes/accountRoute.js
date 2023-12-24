const express = require('express');
const { saveDailyEarns, getTotalEarns, totalEarnByUser, getTotalExpend, saveDailyExped, getQuery, deleteDailyEarns } = require('../Controllers/accountController');
const { protect, setUserAndGroupId } = require('../Controllers/authController');
const { addUsersActivity } = require('../Controllers/activityController');
const router = express.Router();

router.route('/getEarnExpend').get(getQuery,getTotalEarns,getTotalExpend);
router.route('/earn').get(getTotalEarns).post(protect,setUserAndGroupId('earnBy'),saveDailyEarns,addUsersActivity);
router.route('/earn/:id').delete(deleteDailyEarns);
router.route('/getEarnByUser').get(protect,totalEarnByUser);
router.route('/expend').get(getTotalExpend).post(protect,setUserAndGroupId('expendBy'),saveDailyExped);


module.exports = router