const { protect, setUserAndGroupId, restrictTo } = require('../Controllers/authController');
const { createGroup,addMembers,getGroupList, addMemberRequest,verifyGroupToken } = require('../Controllers/groupController');

const router = require('express').Router();

router.use(protect);
router.route('/group').get(restrictTo('admin'),getGroupList).post(createGroup);

router.route('/group/:id').post(protect, addMemberRequest);
router.route('/verifyUser/:verifyToken').get(verifyGroupToken,addMembers);
// http://192.168.137.1:8000/api/v1/groupController/verifyUser/2427fe16735a28a546e0d651d747bf4de8162586a7a881f2592f22f8da5c1f05
module.exports = router