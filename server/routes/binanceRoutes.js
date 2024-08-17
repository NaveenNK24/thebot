const express = require('express');
const router = express.Router();
const historicalData = require('../controllers/binance/historicalData');

router.get('/historical-data',historicalData.historicalData);


module.exports = router;