const express = require('express');
const router = express.Router();
const uptoxAuthControllers = require('../controllers/uptoxAuthControllers');
const historicalData = require('../controllers/historicalData');
const authToken = require('../middleware/upstoxAuth')

router.get('/auth',uptoxAuthControllers.authUpstox);
router.get('/code',uptoxAuthControllers.handleUpstoxCallback);
router.get('/historical-data',authToken,historicalData.historicalData);
// authToken

module.exports = router;