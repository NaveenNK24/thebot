const axios = require('axios');
const { sma_inc } = require('../indicators/sma');
const { ema_inc } = require('../indicators/ema');
const { markers_inc } = require('../indicators/marker');
const { calculatePivotLevels } = require('../indicators/cpr');
const { calculateWRSignals } = require('../indicators/WickReversalSignal');
const { calculateERSignal } = require('../indicators/ExpReversalSignal');
const { calculateDojiSignal } = require('../indicators/doji');
const { calculatePOC_VAH_VAL } = require('../indicators/vahval');

exports.historicalData = async (req, res) => {
    const { symbol } = req.params || {};
    const { smaPeriod } = req.query; 
    const emaPeriod = 20;
    const interval = '1m';
    const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 1 month ago
    const to = new Date().toISOString().split('T')[0];

    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=1000`;

    

    try {
        const response = await axios.get(url);

        let cdata = await response.data.map(d => {
            // console.log(d[0]);
            const testdate = new Date(d[0]);
            // console.log(testdate);
            
            const utcTime = d[0] / 1000; // Original UTC time in seconds
            const istOffset = 5.5 * 60 * 60; // IST offset in seconds
            const istTime = utcTime + istOffset; // Convert UTC to IST

            return {
                symbol: symbol,
                time: utcTime,
                open: parseFloat(d[1]),
                high: parseFloat(d[2]),
                low: parseFloat(d[3]),
                close: parseFloat(d[4]),
                volume: parseFloat(d[5]),
            };
        });

        // console.log(cdata);
        

        if (isNaN(smaPeriod)) {
            throw new Error('Invalid SMA period');
        }

        cdata = await sma_inc(cdata, 20,"sma1");
        cdata = await sma_inc(cdata, 10,"sma10");

          cdata = await ema_inc(cdata, 8,"ema1");
          cdata = await ema_inc(cdata, 14,"ema2");

        //   cdata = calculateWRSignals(cdata)
        //   cdata = calculateDojiSignal(cdata) //  don't use
        //    cdata = calculateERSignal(cdata)
           
          
          //  console.log("cdata",cdata[15]);
          cdata = markers_inc(cdata); 
            // console.log("cdata",cdata[15]);

        cdata = calculatePivotLevels(cdata);

        cdata = calculatePOC_VAH_VAL(cdata) //don't use
        // console.log("cdata",cdata[100]);
        // console.log("cdata p", cdata.filter((d)=> d.doji !== null));

        res.json(cdata);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { error: 'Historical data.js, An error occurred' });
    }
};
