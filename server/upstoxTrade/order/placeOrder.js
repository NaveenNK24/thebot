// upstoxController.js
const axios = require('axios');
const Order = require('../model/orderSchema');
const { getUpstoxToken } = require('../../middleware/upstoxToken'); // Import the middleware function
 // Import the Order model

exports.placeOrder = async (req, res) => {

    // console.log("req",req.params,req.body,  req.query);
    const {instrument_key, expiry_date} = req.query;
    const token = req.query.token || getUpstoxToken();

    const url = 'https://api-hft.upstox.com/v2/order/place';
    const params = {
        // instrument_key: 'NSE_INDEX|Nifty 50',
        // expiry_date: '2024-09-26',
        // instrument_key: instrument_key,
        // expiry_date: expiry_date,

        quantity: 25,
        product: 'D',
        validity: 'DAY',
        price: 0,
        tag: 'string',
        instrument_token: 'NSE_FO|50428',
        order_type: 'LIMIT', // Changed to LIMIT for deliver limit order
        transaction_type: 'BUY',
        disclosed_quantity: 0,
        trigger_price: 0,
        is_amo: false,
    };

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    try {
        const response = await axios.get(url, { params, headers });
        
        // Store the order details in the database
        const orderDetails = {
            orderId: response.data.orderId, // Assuming the response contains an orderId
            instrumentToken: params.instrument_token,
            quantity: params.quantity,
            price: params.price,
            orderType: params.order_type,
            transactionType: params.transaction_type,
            validity: params.validity,
        };

        const newOrder = new Order(orderDetails);
        await newOrder.save(); // Save the order to the database

        return res.json(response.data);
        
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to Place Order',
            details: error.message,
        });
    }
};
