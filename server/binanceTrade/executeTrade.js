
const { BuyTransaction, SellTransaction } = require('../models/binanceTransaction');

const executeTrade = (signal,data) => {
    

    console.log("data",data);
    return true
};

module.exports = {executeTrade};