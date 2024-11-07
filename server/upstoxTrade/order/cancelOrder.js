// upstoxController.js
const axios = require('axios');
const OrderAction = require('../model/orderActionSchema');
const { getUpstoxToken } = require('../../middleware/upstoxToken'); // Import the middleware function
 // Import the OrderAction model

exports.cancelOrder = async (req, res) => {

    // console.log("req", req.params, req.body, req.query);
    const { instrument_key, expiry_date, order_id } = req.query; 
    const token = req.query.token || getUpstoxToken();// Ensure order_id is extracted from query

    const url = 'https://api-hft.upstox.com/v2/order/cancel';
    const params = {
        order_id: order_id // Use the order_id from the query
    };

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    try {
        const response = await axios.get(url, { params, headers });

        // Store the canceled order details in the database
        const orderActionDetails = {
            orderId: params.order_id,
            actionType: 'CANCEL',
            quantity: 0, // Quantity can be set to 0 for canceled orders
            price: 0, // Price can be set to 0 for canceled orders
            validity: 'N/A', // Validity can be set to 'N/A' for canceled orders
        };

        const newOrderAction = new OrderAction(orderActionDetails);
        await newOrderAction.save(); // Save the canceled order action to the database

        return res.json(response.data);
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to Cancel Order',
            details: error.message,
        });
    }
};
