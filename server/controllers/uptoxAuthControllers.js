
const axios = require('axios');
const qs = require('qs');
const Token = require('../models/upstoxAuthToken')
const jwt = require('jsonwebtoken');


exports.authUpstox = (req, res) => {
    
    const redirectUri = encodeURIComponent(process.env.REDIRECT_URI);
    const authUrl = `https://api.upstox.com/v2/login/authorization/dialog?client_id=${process.env.CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code`;
    res.redirect(authUrl);
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

        //  console.log(access_token);
        //  const expiresAt = new Date(Date.now() + expires_in * 1000);

        // // Store tokens in the database
        // const tokenDoc = new Token({ accessToken: access_token });
        // await tokenDoc.save();

        // Send tokens as a response
        // localStorage.setItem('upstoxAccessToken', access_token);
    

        
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
