const express = require('express');
const router = express.Router();
const uptoxAuthControllers = require('../controllers/uptoxAuthControllers');
const historicalData = require('../controllers/historicalUpstoxData');
const authToken = require('../middleware/upstoxAuth');
const { optionChain } = require('../upstoxTrade/FO/optionchain');

router.get('/auth',uptoxAuthControllers.authUpstox);
router.get('/code',uptoxAuthControllers.handleUpstoxCallback);
router.get('/historical-data',authToken,historicalData.historicalData);
// app.get('historical-data/:strikePrice', optionChainController.historicalData);
// router.get('/option-chain',authToken,optionChain);
router.get('/option-chain',optionChain);
// optionChain
// authToken

module.exports = router;
