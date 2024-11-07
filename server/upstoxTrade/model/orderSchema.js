const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true, // Ensures that each order ID is unique
    },
    instrumentToken: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    orderType: {
        type: String,
        enum: ['LIMIT', 'MARKET'], // Specify allowed order types
        required: true,
    },
    transactionType: {
        type: String,
        enum: ['BUY', 'SELL'], // Specify allowed transaction types
        required: true,
    },
    validity: {
        type: String,
        enum: ['DAY', 'GTC'], // Specify allowed validity types
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Automatically set the update date
    },
});

// Middleware to update the updatedAt field on save
orderSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;