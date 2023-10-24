const { protect, setUserAndGroupId, restrictTo } = require('../Controllers/authController');
const { createGroup,addMembers,getGroupList, addMemberRequest } = require('../Controllers/groupController');

const router = require('express').Router();

router.use(protect);
router.route('/group').get(restrictTo('admin'),getGroupList).post(createGroup);

router.route('/group/:id').patch(protect, addMemberRequest ,addMembers);

module.exports = router