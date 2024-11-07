const mongoose = require('mongoose');

const orderActionSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    actionType: {
        type: String,
        enum: ['MODIFY', 'CANCEL'], // Specify allowed action types
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
    validity: {
        type: String,
        enum: ['DAY', 'GTC'], // Specify allowed validity types
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
    },
});

// Middleware to update the updatedAt field on save
orderActionSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const OrderAction = mongoose.model('OrderAction', orderActionSchema);

module.exports = OrderAction;