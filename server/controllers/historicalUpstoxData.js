const axios = require('axios');

exports.historicalData = async (req, res) => {
    const symbol = 'NSE_EQ%7CINE848E01016';
    const interval = 'day';
    const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 1 month ago
    const to = new Date().toISOString().split('T')[0];

    try {
        const response = await axios.get(`https://api.upstox.com/v2/historical-candle/${symbol}/${interval}/${to}/${from}`
        );
        console.log(response);   
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { error: 'An error occurred' });
    }
};