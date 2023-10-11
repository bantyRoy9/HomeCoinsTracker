const { protect } = require('../Controllers/authController');
const { createGroup } = require('../Controllers/groupController');

const router = require('express').Router();

router.route('/group').post(protect,createGroup);

module.exports = router