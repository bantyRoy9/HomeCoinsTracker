const { protect, getUserId, restrictTo } = require('../Controllers/authController');
const { createGroup,addMembers,getGroupList } = require('../Controllers/groupController');

const router = require('express').Router();

router.use(protect);
router.route('/group').get(restrictTo('admin'),getGroupList).post(createGroup);

router.route('/group/:id').patch(restrictTo('admin'),addMembers);

module.exports = router