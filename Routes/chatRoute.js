const { protect } = require('../Controllers/authController');
const { getChatMessages } = require("../Controllers/Socket.ioController");
const router = require('express').Router();
router.use(protect);
router.route('/chat/:groupId').get(getChatMessages);

module.exports = router;