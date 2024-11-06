const transformToMultiTimeFrame = async (data, interval) =>  {
    // Helper function to round down time to nearest interval
    const  roundTimeToInterval = (time, interval) => {
      return Math.floor(time / (interval * 60)) * (interval * 60);
    }
  
    // Group data based on the interval
    const groupedData = {};
    data.forEach(candle => {
      const roundedTime = roundTimeToInterval(candle.time, interval);
  
      if (!groupedData[roundedTime]) {
        groupedData[roundedTime] = {
          symbol: candle.symbol,
          time: roundedTime,
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close,
          volume: candle.volume,
          ema1: candle.ema1,
          ema2: candle.ema2,
          longBuy: candle.longBuy,
          longSell: candle.longSell,
          buySellDifference: candle.buySellDifference
        };
      } else {
        const currentGroup = groupedData[roundedTime];
        currentGroup.high = Math.max(currentGroup.high, candle.high);
        currentGroup.low = Math.min(currentGroup.low, candle.low);
        currentGroup.close = candle.close;
        currentGroup.volume += candle.volume;
        // Handle ema1, ema2, etc. if aggregation needed
      }
    });
    console.log(groupedData)
  
    // Convert grouped data back into an array
    return Object.values(groupedData);
  }

  module.exports = {transformToMultiTimeFrame}
  
  
  
  
  