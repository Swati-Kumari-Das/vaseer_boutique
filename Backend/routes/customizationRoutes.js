const express = require('express');
const router = express.Router();
const createCustomization = require('../controllers/customizationController').createCustomization;
const verifyToken = require('../middleware/auth'); // ✅ FIXED

router.post('/create', verifyToken, createCustomization);

module.exports = router;
