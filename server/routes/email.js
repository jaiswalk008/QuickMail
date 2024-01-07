const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email');
const authentication = require('../Middleware/auth');
router.post('/send',authentication,emailController.sendEmail);

module.exports = router;