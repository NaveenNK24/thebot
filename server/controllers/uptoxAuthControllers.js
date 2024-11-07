
const axios = require('axios');
const qs = require('qs');
const Token = require('../models/upstoxAuthToken')
const jwt = require('jsonwebtoken');
const { setUpstoxToken } = require('../middleware/upstoxToken'); // Import the middleware function


 exports.authUpstox = async (req, res) => {

     const redirectUri = encodeURIComponent(process.env.REDIRECT_URI);
    //  console.log(redirectUri);
     const authUrl = `https://api.upstox.com/v2/login/authorization/dialog?client_id=${process.env.CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code`;
     try {
        const response = await axios.get(authUrl, {
          method: 'GET',
          withCredentials: true  // Include cookies, if applicable
        });
        // res.json(response.data);
        res.json({authUrl});
        // console.log("response",response);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
     
    //  res.json({authUrl});
    //  res.redirect(authUrl);
    
    
    // const redirectUri = encodeURIComponent(process.env.REDIRECT_URI);
    // const authUrl = `https://api.upstox.com/v2/login/authorization/dialog?client_id=${process.env.CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code`;
    // res.redirect(authUrl);
  };

exports.handleUpstoxCallback = async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            return res.status(400).json({ error: 'No authorization code found' });
        }

        const tokenUrl = 'https://api.upstox.com/v2/login/authorization/token';

        // Exchange the code for tokens
        const response = await axios.post(tokenUrl, qs.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.REDIRECT_URI,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // console.log(response);
        
         const { access_token } = response.data;
        //  setUpstoxToken(access_token);

        //  console.log(access_token);
        //  const expiresAt = new Date(Date.now() + expires_in * 1000);

        // Store tokens in the database
        const tokenDoc = await Token.findOneAndUpdate(
            {}, // Find the first document (no filter)
            { upstoxToken: access_token }, // Update the token
            { new: true, upsert: true } // Return the updated document and create if it doesn't exist
        );
        
        res.json({
            access_token,
            // refresh_token,
            // expires_in,
        });

    } catch (error) {
        console.error('Error handling Upstox callback:', error);

        // Handle error from axios response
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: 'handleUpstoxCallback Internal Server Error' });
        }
    }
};
