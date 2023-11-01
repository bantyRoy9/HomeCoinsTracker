const { getActivity } = require('../Controllers/activityController');

const router = require('express').Router();

router.route('/activity/:groupId').get(getActivity);

module.exports = router