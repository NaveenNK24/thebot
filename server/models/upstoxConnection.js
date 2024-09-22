const mongoose = require('mongoose');

const UpstoxConnectionSchema = new mongoose.Schema({
  connectionName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  apiKey: {
    type: String,
    required: true,
    trim: true
  },
  apiSecret: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Pre-save hook to update the 'updatedAt' field
UpstoxConnectionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create a unique index on connectionName
UpstoxConnectionSchema.index({ connectionName: 1 }, { unique: true });

const UpstoxConnection = mongoose.model('UpstoxConnection', UpstoxConnectionSchema);

module.exports = UpstoxConnection;