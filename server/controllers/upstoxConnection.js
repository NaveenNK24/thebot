const express = require('express');
const router = express.Router();
const UpstoxConnection = require('../models/UpstoxConnection'); // Mongoose model

router.get('/connection-status', async (req, res) => {
  try {
    const connection = await UpstoxConnection.findOne();
    res.json({ isConnected: !!connection });
  } catch (err) {
    console.error('Error checking connection status:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/connect', async (req, res) => {
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
    process.env.UPSTOX_API_KEY = apiKey;
    process.env.UPSTOX_API_SECRET = apiSecret;

    res.json({ success: true });
  } catch (err) {
    console.error('Error connecting to Upstox:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;