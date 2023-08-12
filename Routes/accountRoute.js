const express = require('express');
const { getEarns } = require('../Controllers/accountController');
const router = express.Router();

router.post('/earn', getEarns);


module.exports = router