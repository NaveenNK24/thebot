const axios = require('axios');
const {sma_inc} = require('../../indicators/sma')

exports.historicalData = async (req, res) => {
    console.log("params",req.params)
    const { symbol = "ETHUSDT" } = req.params || {};
    // const symbol = "ETHUSDT";
    const interval = '1d';
    const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 1 month ago
    const to = new Date().toISOString().split('T')[0];
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=1000`

    try {
        const response = await axios.get(url)
        // console.log(response);
        
        let cdata = response.data.map(d => ({
            time: d[0] / 1000,
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4]),
          }));
          cdata = await sma_inc(cdata)
        //   console.log(cdata);
          res.json(cdata);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { error: 'An error occurred' });
    }
};