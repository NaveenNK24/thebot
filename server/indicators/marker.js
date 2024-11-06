// // const { executeTrade } = require('../binanceTrade/executeTrade');
// // const { BuyTransaction, SellTransaction } = require('../models/binanceTransaction');


// const markers_inc = (data) => {
//     let inBuyState = false;         // Track if we are currently in a buy state
//     let inSellState = false;        // Track if we are currently in a sell state
//     let buySignalActive = false;    // Track if a buy signal is currently active
//     let sellSignalActive = false;   // Track if a sell signal is currently active
//     let lastBuyLTP = null;          // Store the last traded price (LTP) when a buy signal was triggered
//     let lastSellLTP = null;         // Store the last traded price (LTP) when a sell signal was triggered
//     let buySellDifference = null;   // Store the difference between buy and sell LTP for profit calculation

//     // Loop through each candle in the data
//     data = data.map((currentCandle, i, arr) => {
//         // console.log(currentCandle)
//         // Get the previous and second previous candles safely (if they exist)
//         const previousCandle = i > 0 ? arr[i - 1] : null;
//         const secondPreviousCandle = i > 1 ? arr[i - 2] : null;

//         // Check if the last two candles are green (close > open)
//         const areLastTwoCandlesGreen = previousCandle && secondPreviousCandle &&
//             previousCandle.close > previousCandle.open &&
//             secondPreviousCandle.close > secondPreviousCandle.open;

//         // Check if the previous candle is green or red
//         const isPreviousGreen = previousCandle && previousCandle.close > previousCandle.open;
//         const isPreviousRed = previousCandle && previousCandle.close < previousCandle.open;

//         // Condition for a Buy Signal (longBuy):
//         // - Current volume is greater than the previous two candles.
//         // - Last candle can either be green (close > previous close) or red (close > previous open).
//         // - OR, both last two candles are green, and the current close is higher than both.
//         const longBuy = !inBuyState && currentCandle.sma1>previousCandle?.sma1 &&
//             ((currentCandle.volume > previousCandle?.volume && currentCandle.volume > secondPreviousCandle?.volume &&
//                 ((isPreviousGreen && currentCandle.close > previousCandle.close) ||
//                  (isPreviousRed && currentCandle.close > previousCandle.open))) ||
//                 (areLastTwoCandlesGreen && currentCandle.close > previousCandle.close && currentCandle.close > secondPreviousCandle.close));

//                 if (longBuy) {
//                     console.log("longBuy", longBuy);
//                     try {
//                         const exec = executeTrade(longBuy, currentCandle);
//                         console.log("exec", exec);
//                     } catch (error) {
//                         console.error("Error executing trade:", error);
//                     }
//                 }

//         // Condition for a Sell Signal (longSell):
//         // - We're in a buy state, and:
//         //   - If previous candle is green, the current close is below the previous low.
//         //   - If previous candle is red, the current close is also below the previous low.
//         const longSell = inBuyState && 
//             ((isPreviousGreen && currentCandle.close < previousCandle.low) || 
//              (isPreviousRed && currentCandle.close < previousCandle.low));

//         // Handle Buy Signal
//         if (longBuy && !buySignalActive) {
//             inBuyState = true;              // Enter the buy state
//             inSellState = false;            // Exit the sell state
//             buySignalActive = true;         // Activate buy signal
//             sellSignalActive = false;       // Deactivate sell signal
//             lastBuyLTP = currentCandle.close; // Store the LTP for the buy signal
//         }

//         // Handle Sell Signal
//         if (longSell && !sellSignalActive) {
//             inSellState = true;             // Enter the sell state
//             inBuyState = false;             // Exit the buy state
//             sellSignalActive = true;        // Activate sell signal
//             buySignalActive = false;        // Deactivate buy signal
//             lastSellLTP = currentCandle.close; // Store the LTP for the sell signal
//         }

//         // Calculate the difference between buy and sell LTP, if both exist
//         if (lastBuyLTP !== null && lastSellLTP !== null) {
//             buySellDifference = lastSellLTP - lastBuyLTP;
//         }

//         // Reset the buy signal after it's been triggered
//         if (!longBuy && inBuyState) {
//             buySignalActive = false;
//         }

//         // Reset the sell signal after it's been triggered
//         if (!longSell && inSellState) {
//             sellSignalActive = false;
//         }

//         // Add signals and the buy-sell difference to the current candle data
//         return { 
//             ...currentCandle, 
//             longBuy: buySignalActive, 
//             longSell: sellSignalActive, 
//             // shortBuy: shortSignalActive,
//             // shortSell: shortSignalActive,
//             buySellDifference 
//         };
//     });

//     return data;
// };

// module.exports = { markers_inc };





//Crypto

const markers_inc = (data) => {
    let inBuyState = false;          // Track if we are currently in a buy state
    let inSellState = false;         // Track if we are currently in a sell state
    let buySignalActive = false;     // Track if a buy signal is currently active
    let sellSignalActive = false;    // Track if a sell signal is currently active
    let inShortBuyState = false;     // Track if we are currently in a short buy state
    let inShortSellState = false;    // Track if we are currently in a short sell state
    let shortBuySignalActive = false; // Track if a short buy signal is currently active
    let shortSellSignalActive = false; // Track if a short sell signal is currently active
    let lastBuyLTP = null;           // Store the last traded price (LTP) when a buy signal was triggered
    let lastSellLTP = null;          // Store the last traded price (LTP) when a sell signal was triggered
    let buySellDifference = null;    // Store the difference between buy and sell LTP for profit calculation
    let lastshortBuyLTP = null;           // Store the last traded price (LTP) when a buy signal was triggered
    let lastshortSellLTP = null;          // Store the last traded price (LTP) when a sell signal was triggered
    let buyshortSellDifference = null; 
    // Loop through each candle in the data
    data = data.map((currentCandle, i, arr) => {
        const previousCandle = i > 0 ? arr[i - 1] : null;
        const secondPreviousCandle = i > 1 ? arr[i - 2] : null;

        // Check if the last two candles are green (close > open)
        const areLastTwoCandlesGreen = previousCandle && secondPreviousCandle &&
            previousCandle.close > previousCandle.open &&
            secondPreviousCandle.close > secondPreviousCandle.open;

        // Check if the last two candles are red (close < open)
        const areLastTwoCandlesRed = previousCandle && secondPreviousCandle &&
            previousCandle.close < previousCandle.open &&
            secondPreviousCandle.close < secondPreviousCandle.open;

        // Check if the previous candle is green or red
        const isPreviousGreen = previousCandle && previousCandle.close > previousCandle.open;
        const isPreviousRed = previousCandle && previousCandle.close < previousCandle.open;

        // Long Buy Condition:
        const longBuy = !inBuyState && currentCandle.sma1 > previousCandle?.sma1 &&
            ((currentCandle.volume > previousCandle?.volume && currentCandle.volume > secondPreviousCandle?.volume &&
                ((isPreviousGreen && currentCandle.close > previousCandle.close) ||
                 (isPreviousRed && currentCandle.close > previousCandle.open))) ||
                (areLastTwoCandlesGreen && currentCandle.close > previousCandle.close && currentCandle.close > secondPreviousCandle.close));

        // Long Sell Condition:
        const longSell = inBuyState &&
            ((isPreviousGreen && currentCandle.close < previousCandle.low) ||
             (isPreviousRed && currentCandle.close < previousCandle.low));

        // Short Buy Condition:
        const shortBuy = !inShortBuyState && currentCandle.sma1 < previousCandle?.sma1 &&
            ((currentCandle.volume > previousCandle?.volume && currentCandle.volume > secondPreviousCandle?.volume &&
                ((isPreviousRed && currentCandle.close < previousCandle.close) ||
                 (isPreviousGreen && currentCandle.close < previousCandle.open))) ||
                (areLastTwoCandlesRed && currentCandle.close < previousCandle.close && currentCandle.close < secondPreviousCandle.close));

        // Short Sell Condition:
        const shortSell = inShortBuyState &&
            ((isPreviousRed && currentCandle.close > previousCandle.high) ||
             (isPreviousGreen && currentCandle.close > previousCandle.high));

        // Handle Long Buy Signal
        if (longBuy && !buySignalActive) {
            inBuyState = true;
            inSellState = false;
            buySignalActive = true;
            sellSignalActive = false;
            lastBuyLTP = previousCandle.close;
        }

        // Handle Long Sell Signal
        if (longSell && !sellSignalActive) {
            inSellState = true;
            inBuyState = false;
            sellSignalActive = true;
            buySignalActive = false;
            lastSellLTP = previousCandle.low;
        }

        // Handle Short Buy Signal
        if (shortBuy && !shortBuySignalActive) {
            inShortBuyState = true;
            inShortSellState = false;
            shortBuySignalActive = true;
            shortSellSignalActive = false;
            lastshortBuyLTP = previousCandle.close;
        }

        // Handle Short Sell Signal
        if (shortSell && !shortSellSignalActive) {
            inShortSellState = true;
            inShortBuyState = false;
            shortSellSignalActive = true;
            shortBuySignalActive = false;
            lastshortSellLTP = previousCandle.high;
        }

        // Calculate the difference between buy and sell LTP, if both exist
        if (lastBuyLTP !== null && lastSellLTP !== null) {
            buySellDifference = lastSellLTP - lastBuyLTP;
        }
        if (lastshortBuyLTP !== null && lastshortSellLTP !== null) {
            buyshortSellDifference = lastshortBuyLTP - lastshortSellLTP ;
        }

        // Reset the buy signal after it's been triggered
        if (!longBuy && inBuyState) {
            buySignalActive = false;
        }

        // Reset the sell signal after it's been triggered
        if (!longSell && inSellState) {
            sellSignalActive = false;
        }

        // Reset the short buy signal after it's been triggered
        if (!shortBuy && inShortBuyState) {
            shortBuySignalActive = false;
        }

        // Reset the short sell signal after it's been triggered
        if (!shortSell && inShortSellState) {
            shortSellSignalActive = false;
        }

        // Add signals and the buy-sell difference to the current candle data
        return { 
            ...currentCandle, 
            longBuy: buySignalActive, 
            longSell: sellSignalActive, 
            shortBuy: shortBuySignalActive,
            shortSell: shortSellSignalActive,
            buySellDifference,
            buyshortSellDifference
        };
    });

    return data;
};
module.exports = { markers_inc };