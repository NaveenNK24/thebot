// upstoxController.js
const axios = require('axios');
const OrderAction = require('../model/orderActionSchema');
const { getUpstoxToken } = require('../../middleware/upstoxToken'); // Import the middleware function
 // Import the OrderAction model

exports.modifyOrder = async (req, res) => {

    // console.log("req", req.params, req.body, req.query);
    const { instrument_key, expiry_date } = req.query;
    const token = req.query.token || getUpstoxToken();


    const url = 'https://api-hft.upstox.com/v2/order/modify';
    const params = {
        'quantity': 2,
        'validity': 'DAY',
        'price': 16.8,
        'order_id': '240108010918222',
        'order_type': 'LIMIT',
        'disclosed_quantity': 0,
        'trigger_price': 16.9
    };

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    try {
        const response = await axios.get(url, { params, headers });

        // Store the modified order details in the database
        const orderActionDetails = {
            orderId: params.order_id,
            actionType: 'MODIFY',
            quantity: params.quantity,
            price: params.price,
            validity: params.validity,
        };

        const newOrderAction = new OrderAction(orderActionDetails);
        await newOrderAction.save(); // Save the modified order action to the database

        return res.json(response.data);
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to Modify Order',
            details: error.message,
        });
    }
};
