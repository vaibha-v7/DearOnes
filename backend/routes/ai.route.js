const express = require('express');
const router = express.Router();
const aiController = require('../controller/ai.controller');

// Optional: you could add verifyToken middleware here if you want only logged-in users to use AI
router.post('/enhance', aiController.enhanceMessage);

module.exports = router;
