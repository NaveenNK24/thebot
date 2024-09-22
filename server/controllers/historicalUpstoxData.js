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
    // const symbol = 'NSE_EQ%7CINE848E01016';
    const symbol = 'NSE_FO|56046';
    //NSE_FO|67667"
    const interval = '1minute';
    //interval -> 1minute, 30minute, day, week, month
    const from = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 1 month ago
    const to = new Date().toISOString().split('T')[0];
    console.log(from,to);
    

    const response = await axios.get(`https://api.upstox.com/v2/historical-candle/${symbol}/${interval}/${to}/${from}`
    );
    // console.log(response.data);



    const candles = response.data.data?.candles; // Optional chaining in case 'data' or 'candles' is undefined
// console.log(candles);

    if (candles && Array.isArray(candles)) {
    let cdata = candles.sort((a, b) => {
        const timestampA = Math.floor(new Date(a[0]).getTime() / 1000);
        const timestampB = Math.floor(new Date(b[0]).getTime() / 1000);
        return timestampA - timestampB;
      }).map((candle, index) => {
        const [timestamp, open, high, low, close, volume] = candle;
        const timestampInSeconds = Math.floor(new Date(timestamp).getTime() / 1000);
        const istOffset = 5.5 * 60 * 60; // IST offset in seconds
            const istTime = timestampInSeconds + istOffset; // Convert UTC to IST
        // console.log(timestampInSeconds);
        
        return {
                            time: istTime,
                            open: parseFloat(open),
                            high: parseFloat(high),
                            low: parseFloat(low),
                            close: parseFloat(close),
                            volume: parseFloat(volume),
                        };
    });
    // console.log("cdata",cdata.map(c => c.time));


    // if (isNaN(smaPeriod)) {
    //     throw new Error('Invalid SMA period');
    // }

    cdata = await sma_inc(cdata, 20,"sma1");
    // cdata = await sma_inc(cdata, 10,"sma10");

      cdata = await ema_inc(cdata, 8,"ema1");
      cdata = await ema_inc(cdata, 14,"ema2");

    //   cdata = calculateWRSignals(cdata)
    //   cdata = calculateDojiSignal(cdata) //  don't use
    //    cdata = calculateERSignal(cdata)
       
      
      //  console.log("cdata",cdata[15]);
    //   cdata = markers_inc(cdata); //  don't use
        // console.log("cdata",cdata[15]);

    cdata = calculatePivotLevels(cdata);

    // cdata = calculatePOC_VAH_VAL(cdata) //don't use
    // console.log("cdata",cdata[100]);
    // console.log("cdata p", cdata.filter((d)=> d.doji !== null));
    res.json(cdata);
    } else {
    console.log("Candles is undefined or not an array");
}


    try {

    } catch (error) {
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { error: 'An error occurred' });
    }
};