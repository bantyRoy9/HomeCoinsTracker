const { protect, getUserId } = require('../Controllers/authController');
const { createGroup,addMembers,getGroupList } = require('../Controllers/groupController');

const router = require('express').Router();

router.route('/group')
    .get(protect,getGroupList)
    .post(protect,getUserId('createdBy,members'),createGroup);
router.route('/group/:id')
    .patch(protect,addMembers);

module.exports = router