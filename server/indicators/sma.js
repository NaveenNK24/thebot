const tulind = require('tulind');
const { promisify } = require('util');

// Promisify Functions
const sma_async = promisify(tulind.indicators.sma.indicator);


const sma_inc = async (data,period) => {
  // Extract close prices from the data

  console.log(data,period);
  
  const closePrices = data.map((d) => d.close);

  // Calculate the Simple Moving Average (SMA)
  const results = await sma_async([closePrices], [period]);
  const smaValues = results[0];

  // Calculate the difference in lengths between the original data and SMA values
  const diff = data.length - smaValues.length;

  // Create an array of empty strings to match the length of the original data
  const emptyArray = new Array(diff).fill('');

  // Combine empty values with SMA values
  const combinedSmaValues = [...emptyArray, ...smaValues];

  // Merge the SMA values back into the original data
  const updatedData = data.map((d, i) => ({ ...d, sma: combinedSmaValues[i] }));
  console.log("updated",updatedData);
  
  return updatedData;
};

module.exports = { sma_inc };
