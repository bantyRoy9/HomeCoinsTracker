const express = require('express');
const { protect, restrictTo } = require('../Controllers/authController');
const { getSource , createSource } = require('../Controllers/sourceController');

const router = express.Router();
router.route('/source').get(getSource).post(protect,restrictTo(['Admin']),createSource);