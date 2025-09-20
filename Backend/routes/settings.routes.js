const express = require('express');
const { getSettings, updateSettings, createSettings } = require('../controllers/settings.controller');
const router = express.Router();

router.get('/',getSettings);

router.post('/', createSettings)

router.put('/', updateSettings)

module.exports = router