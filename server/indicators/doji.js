const calculateDojiSignal = (data, percentage = 0.10) => {
    return data.map((obj, i, arr) => {
      if (i < 2) {
        // Skip the first two items as they don't have enough previous data
        return { ...obj, doji: null };
      }
      
      const prev = arr[i - 1];
      const prev2 = arr[i - 2];

      console.log(prev,prev2);
      
      
      const fRangeHL = prev.high - prev.low;
      const fRangeCO = Math.abs(prev.close - prev.open);
  
      let dojiSignal = null;
  
      if (
        fRangeCO <= fRangeHL * percentage &&
        prev.close < prev.low &&
        prev.low > prev.sma10 &&
        prev.close < prev.open ||
        (prev.close < prev2.low && prev.close >= prev2.low) &&
        fRangeCO <= fRangeHL * percentage &&
        prev.close < prev.open &&
        prev2.low > prev.sma10)
      {
        dojiSignal = 'Short';
      } else if (
        fRangeCO <= fRangeHL * percentage &&
        prev.close > prev.high &&
        prev.high < prev.sma10 &&
        prev.close > prev.open ||
        (prev.close > prev2.high && prev.close <= prev2.high) &&
        fRangeCO <= fRangeHL * percentage &&
        prev.close > prev.open &&
        prev2.high < prev.sma10)
      {
        dojiSignal = 'Long';
      }
  
      return { ...obj, doji: dojiSignal };
    });
  };
  

  module.exports = { calculateDojiSignal };
  