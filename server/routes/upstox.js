const express = require('express');
const router = express.Router();
const uptoxAuthControllers = require('../controllers/uptoxAuthControllers');
const historicalData = require('../controllers/historicalUpstoxData');
const authToken = require('../middleware/upstoxAuth');
const { optionChain } = require('../upstoxTrade/FO/optionchain');
const upstoxConnection = require('../controllers/upstoxConnection');

router.get('/auth',uptoxAuthControllers.authUpstox);
router.get('/code',uptoxAuthControllers.handleUpstoxCallback);
router.get('/historical-data',authToken,historicalData.historicalData);
// app.get('historical-data/:strikePrice', optionChainController.historicalData);
// router.get('/option-chain',authToken,optionChain);
router.get('/option-chain',optionChain);
router.post('/upstox-connect',upstoxConnection.connect);
router.get('/get-connection-status',upstoxConnection.getConnectionStatus);
router.delete('/upstox-disconnect',upstoxConnection.disconnect);



// optionChain
// authToken

module.exports = router;
