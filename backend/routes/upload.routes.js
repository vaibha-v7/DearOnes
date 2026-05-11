const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controller/upload.controller');
const authMiddleware = require('../middleware/auth.middleware');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Using authMiddleware to ensure only logged in users can upload
router.post('/', authMiddleware.verifyToken, upload.single('image'), uploadController.uploadImage);

module.exports = router;
