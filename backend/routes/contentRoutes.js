const express = require('express');
const router = express.Router();
const { search } = require('../controllers/locationController');

router.get('/', search);

module.exports = router;
