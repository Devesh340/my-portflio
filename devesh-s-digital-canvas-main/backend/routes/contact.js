const express = require('express');
const { handleContactSubmission } = require('../controllers/contactController');

const router = express.Router();

// POST /api/contact
router.post('/', handleContactSubmission);

module.exports = router;
