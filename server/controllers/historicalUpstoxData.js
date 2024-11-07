const axios = require('axios');
const { sma_inc } = require('../indicators/sma');
const { ema_inc } = require('../indicators/ema');
const { markers_inc } = require('../indicators/marker');
const { calculatePivotLevels } = require('../indicators/cpr');
const { calculateWRSignals } = require('../indicators/WickReversalSignal');
const { calculateERSignal } = require('../indicators/ExpReversalSignal');
const { calculateDojiSignal } = require('../indicators/doji');
const { calculatePOC_VAH_VAL } = require('../indicators/vahval');
const { transformToMultiTimeFrame } = require('../indicators/transformData')

const { eventEmitter } = require("../upstoxTrade/marketfeed/websocket_client");




exports.historicalData = async (req, res) => {

  // console.log("REQ",req.params.instrument_key )
    // const symbol = 'NSE_EQ%7CINE848E01016';
    const symbol = req.params.instrument_key;
    //NSE_FO|67667" NSE_FO|47171 NSE_FO|47168
    const interval = '1minute';
    //interval -> 1minute, 30minute, day, week, month
    const from = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; 
    const to = new Date().toISOString().split('T')[0];
    // console.log(from,to);
    

    // const response = await axios.get(`https://api.upstox.com/v2/historical-candle/${symbol}/${interval}/${to}/${from}`);
    // console.log(response.data);

    const response = await axios.get(`https://api.upstox.com/v2/historical-candle/intraday/${symbol}/${interval}`);
    const formatTimestamp = (ts) => {
    const date = new Date(ts * 1000); // Convert timestamp from seconds to milliseconds
    return date.toISOString();
  };

  
    
    eventEmitter.on("marketData", (data) => {
     
        // Process data as needed
        // console.log("Received market data:", data);
        const niftyData = data.feeds?.["NSE_INDEX|Nifty 50"]?.ff?.indexFF?.marketOHLC?.ohlc;
        // const foData = data.feeds?.["NSE_FO|54751"]?.ff?.marketFF?.marketOHLC?.ohlc;
        const foData =  data.feeds?.["NSE_FO|50387"]?.ff?.marketFF?.marketOHLC?.ohlc;
        const currentTs = data.currentTs;

        // console.log("OHLC FO",foData)

        // console.log("currentTs",parseInt(currentTs))

        if (niftyData) {
          // Filter for entries with interval "I1"
          // const intervalI1Data = niftyData.filter((entry) => entry.interval === "I1");
      
          console.log("Filtered interval I1 data:", intervalI1Data);
      
          // Process or store the filtered data as needed
        } else {
          console.log("data or interval I1 data not found.");
        }
        if (foData && foData.length > 0) {
            // Filter for entries with interval "I1"
            // const intervalI1Data = foData.filter((entry) => entry.interval === "I1");

            const candles1 = foData
            .filter(entry => entry.interval === "I1") // Filter for interval "I1"
            .map(entry => {
                // Convert timestamp to ISO 8601 format
                const timestamp = new Date(parseInt(entry.ts)).toISOString(); // Convert to ISO format
                return [
                    timestamp, // ISO 8601 timestamp
                    entry.open, // open
                    entry.high, // high
                    entry.low,  // low
                    entry.close, // close
                    entry.volume, // volume
                ];
            });
        // console.log("candles1",candles1[1]);
        candles.push(...candles1[1]); 
        // console.log("candles",candles[10]);
            // console.log("Filtered interval I1 data:", intervalI11Data);
        
            // Process or store the filtered data as needed
          } else {
            console.log("NSE FO data or interval I1 data not found.");
          }
      });

    
    // https://api.upstox.com/v2/historical-candle/intraday/:instrument_key/:interval


    const candles = response.data.data?.candles; 
    // candles.push(...candles1[1]); // Optional chaining in case 'data' or 'candles' is undefined
// console.log("candle",candles[0]);

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
            symbol: symbol,
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
      cdata = markers_inc(cdata); //  don't use
        // console.log("cdata",cdata[15]);

    cdata = calculatePivotLevels(cdata);


    // cdata = transformToMultiTimeFrame(cdata, 5);
//   cdata = transformToMultiTimeFrame(oneMinuteData, 15);

    // cdata = calculatePOC_VAH_VAL(cdata) //don't use
    // console.log("cdata",cdata[100]);
    // console.log("cdata p", cdata.filter((d)=> d.doji !== null));
    console.log("cdata",cdata)
    res.json(cdata);
    } else {
    console.log("Candles is undefined or not an array");
}


    try {

    } catch (error) {
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { error: 'An error occurred' });
    }
};