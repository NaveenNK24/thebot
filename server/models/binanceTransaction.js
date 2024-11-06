const mongoose = require('mongoose');

const buyTransactionSchema = new mongoose.Schema({
    symbol: String,
    price: Number,
    quantity: Number,
    type: String,
    timestamp: Date
});

const sellTransactionSchema = new mongoose.Schema({
    symbol: String,
    price: Number,
    quantity: Number,
    type: String,
    timestamp: Date,
    profit: Number
});



module.exports = {
    BuyTransaction: mongoose.model('BuyTransaction', buyTransactionSchema),
    SellTransaction: mongoose.model('SellTransaction', sellTransactionSchema)
};


