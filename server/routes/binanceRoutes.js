const express = require('express');
const router = express.Router();
const historicalData = require('../controllers/binance/historicalData');

router.get('/historical-data/:symbol',historicalData.historicalData);


module.exports = router;