const express = require('express');
const { protect, restrictTo } = require('../Controllers/authController');

const router = express.Router();

router.route('source').get(getSource).post(protect,restrictTo(['Admin']),createSource);
