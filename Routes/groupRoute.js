const { protect, setUserAndGroupId, restrictTo } = require('../Controllers/authController');
const { createGroup,addMembers,getGroupList, addMemberRequest,verifyGroupToken } = require('../Controllers/groupController');

const router = require('express').Router();

router.route('/verifyUser/:verifyToken').get(verifyGroupToken,addMembers);
router.use(protect);
router.route('/group').get(restrictTo('admin'),getGroupList).post(createGroup);
router.route('/group/:id').post(addMemberRequest);
module.exports = router