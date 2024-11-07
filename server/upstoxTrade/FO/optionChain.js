// upstoxController.js
const axios = require('axios');

exports.optionChain = async (req, res) => {

    // console.log("req",req.params,req.body,  req.query);
    const {instrument_key, expiry_date,token} = req.query;

    const url = 'https://api.upstox.com/v2/option/chain';
    const params = {
        // instrument_key: 'NSE_INDEX|Nifty 50',
        // expiry_date: '2024-09-26',
        instrument_key: instrument_key,
        expiry_date: expiry_date,

    };


    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI3TUFONzkiLCJqdGkiOiI2NmY0MDQ0MjQ4NzE4NDdmNTBhNDhmMmEiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaWF0IjoxNzI3MjY3OTA2LCJpc3MiOiJ1ZGFwaS1nYXRld2F5LXNlcnZpY2UiLCJleHAiOjE3MjczMDE2MDB9.1qF0YhfGrJzcvBc2gEZImRlNO95c4qSY6dpHtqyk0bA',
    };

    

    try {
        const response = await axios.get(url, { params, headers });
        return res.json(response.data);
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to fetch option chain data',
            details: error.message,
        });
    }
};
