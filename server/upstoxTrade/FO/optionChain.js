// upstoxController.js
const axios = require('axios');

exports.optionChain = async (req, res) => {
    const url = 'https://api.upstox.com/v2/option/chain';
    const params = {
        instrument_key: 'NSE_INDEX|Nifty 50',
        expiry_date: '2024-09-26',
    };


    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI3TUFONzkiLCJqdGkiOiI2NmVmYWRmZDg4ZmI3ZjRjODRlNDIzNTgiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaWF0IjoxNzI2OTgzNjc3LCJpc3MiOiJ1ZGFwaS1nYXRld2F5LXNlcnZpY2UiLCJleHAiOjE3MjcwNDI0MDB9.HmJSYhkHa0EzL2QsqQA480sZWbio0c8lmmb4ck7p2qI',
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
