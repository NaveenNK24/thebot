const { log } = require('console');
const tulind = require('tulind');
const { promisify } = require('util');

// Promisify Functions
const ema_async = promisify(tulind.indicators.ema.indicator);


const ema_inc = async (data,period,ema_name) => {
  // Extract close prices from the data
  
  const closePrices = data.map((d) => d.close);

  // Calculate the Simple Moving Average (SMA)
  const results = await ema_async([closePrices], [period]);
  const emaValues = results[0];

  // Calculate the difference in lengths between the original data and SMA values
  const diff = data.length - emaValues.length;

  // Create an array of empty strings to match the length of the original data
  const emptyArray = new Array(diff).fill('');

  // Combine empty values with SMA values
  const combinedEmaValues = [...emptyArray, ...emaValues];

  // Merge the SMA values back into the original data
  const updatedData = data.map((d, i) => ({ ...d, [ema_name]: combinedEmaValues[i] }));
  // console.log("updated",updatedData);
  
  return updatedData;
};

module.exports = { ema_inc };
