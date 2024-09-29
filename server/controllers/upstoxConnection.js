const express = require('express');
const router = express.Router();
const UpstoxConnection = require('../models/UpstoxConnection'); // Mongoose model
const { authUpstox } = require('./uptoxAuthControllers');
const cors = require('cors');

router.use(cors());

const getConnectionStatus = async (req, res) => {
  try {
    const connection = await UpstoxConnection.findOne();
    // console.log(connection);
    if(connection){
      res.json({ isConnected: !!connection ,connectionName:connection.connectionName});
    }
    else{
      res.json({ isConnected: false });
    }
  } catch (err) {
    console.error('Error checking connection status:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const connect = async (req, res) => {
  try {
    const { connectionName, apiKey, apiSecret } = req.body;
    
    // Validate input
    if (!connectionName || !apiKey || !apiSecret) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Store in MongoDB
    await UpstoxConnection.findOneAndUpdate(
      {}, // empty filter to update the first document or create if doesn't exist
      { connectionName, apiKey, apiSecret },
      { upsert: true, new: true }
    );

    // Update environment variables
    process.env.CLIENT_ID = apiKey;
    process.env.CLIENT_SECRET = apiSecret;

  res.json({ success: true })

 ;
  } catch (err) {
    console.error('Error connecting to Upstox:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const disconnect = async (req, res) => {
  try {
    // Delete the connection from MongoDB
    await UpstoxConnection.deleteMany({});

    // Clear environment variables
    process.env.CLIENT_ID = '';
    process.env.CLIENT_SECRET = '';

    res.json({ success: true, message: 'Disconnected successfully' });
  } catch (err) {
    console.error('Error disconnecting from Upstox:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = {
  getConnectionStatus,
  connect,
  disconnect
};