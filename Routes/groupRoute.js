const { protect, getUserId } = require('../Controllers/authController');
const { createGroup,addMembers } = require('../Controllers/groupController');

const router = require('express').Router();

router.route('/group')
    .post(protect,getUserId('createdBy,members'),createGroup)
    .patch(protect,addMembers);

module.exports = router