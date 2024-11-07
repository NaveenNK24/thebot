const mongoose = require('mongoose')

const TokenSchema = mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    upstoxToken: String,
    // expiresAt: Date,
},{
    timestamps:true
})

const Token = mongoose.model('Token',TokenSchema)
module.exports = Token;