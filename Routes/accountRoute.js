const express = require('express');
const { saveDailyEarns, getTotalEarns, totalEarnByUser, getTotalExpend, saveDailyExped, getQuery, deleteDailyEarns } = require('../Controllers/accountController');
const { protect, setUserAndGroupId } = require('../Controllers/authController');
const router = express.Router();

router.route('/getEarnExpend').get(getQuery,getTotalEarns,getTotalExpend);
router.route('/earn')
    .get((req, res, next) => {
        console.log('/earn'); next();
    },
        getTotalEarns
    ).post(
        protect,
        setUserAndGroupId('earnBy'),
        saveDailyEarns
    );
router.route('/earn/:id')
    .delete(deleteDailyEarns);

router.route('/getEarnByUser')
    .get((req, res, next) => {
        console.log('/getEarnExpend'); next();
    },
        protect,
        totalEarnByUser
    );

router.route('/expend')
    .get((req, res, next) => {
        console.log('/expend');
        next();
    },
        getTotalExpend
    ).post((req, res, next) => {
        console.log('/getEarnExpend');
        next();
    },
        protect,
        setUserAndGroupId('expendBy'),
        saveDailyExped
    );


module.exports = router