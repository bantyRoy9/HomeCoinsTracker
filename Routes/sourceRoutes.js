const express = require('express');
const { protect, restrictTo, setUserAndGroupId } = require('../Controllers/authController');
const { getSource , createSource,getExpendType,createExpendType } = require('../Controllers/sourceController');


const router = express.Router();
router.route('/source').get(getSource).post(protect,restrictTo('admin'),setUserAndGroupId('createdBy'),createSource);
router.route('/expendType').get(getExpendType).post(protect,restrictTo('admin'),setUserAndGroupId('createdBy'),createExpendType);

module.exports = router;