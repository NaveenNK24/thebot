const express = require('express');
const router = express.Router();
const uptoxAuthControllers = require('../controllers/uptoxAuthControllers');
const historicalData = require('../controllers/historicalUpstoxData');
const authToken = require('../middleware/upstoxAuth');
const { optionChain } = require('../upstoxTrade/FO/optionchain');
const upstoxConnection = require('../controllers/upstoxConnection');
const {placeOrder} = require('../upstoxTrade/order/placeOrder');
const {cancelOrder} = require('../upstoxTrade/order/cancelOrder');
const {modifyOrder} = require('../upstoxTrade/order/modifyOrder');




router.get('/auth',uptoxAuthControllers.authUpstox);
router.get('/code',uptoxAuthControllers.handleUpstoxCallback);
// router.get('/historical-data',authToken,historicalData.historicalData);
router.get('/historical-data/:instrument_key',historicalData.historicalData);
// router.get('historical-data/:instrument_key',authToken, historicalData.historicalData);
// router.get('/option-chain',authToken,optionChain);
router.get('/option-chain',optionChain);

//Upstox Connection Routes
router.post('/upstox-connect',upstoxConnection.connect);
router.get('/get-connection-status',upstoxConnection.getConnectionStatus);
router.delete('/upstox-disconnect',upstoxConnection.disconnect);

//Order Routes
router.post('/order/place',placeOrder); 
router.delete('/order/cancel',cancelOrder); 
router.put('/order/modify',modifyOrder); 



// optionChain
// authToken

module.exports = router;
