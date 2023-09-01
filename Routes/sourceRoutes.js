const express = require('express');
const { protect, restrictTo, getUserId } = require('../Controllers/authController');
const { getSource , createSource } = require('../Controllers/sourceController');


const router = express.Router();
router.route('/source').get(getSource).post(protect,restrictTo('Admin'),getUserId('createdBy'),createSource);

module.exports = router;