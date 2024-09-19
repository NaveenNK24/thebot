const Token = require('../models/upstoxAuthToken');

const authToken = async (req, res, next) => {
  // console.log(req);
  
  try {
    //  const userId = req.user._id; // Assuming req.user is set after user authentication

    // Find the latest valid token for the current user
    // const tokenDoc = await Token.findOne({ userId }).sort({ expiresAt: -1 });

    const tokenDoc = await Token.findOne();
    console.log(tokenDoc);
    

    if (!tokenDoc || new Date() > tokenDoc.expiresAt) {
      return res.status(400).json({ error: 'No valid token found' });
    }

    // Attach the token to the headers of the request
    req.headers['Authorization'] = `Bearer ${tokenDoc.accessToken}`;
    req.headers['Accept'] = 'application/json';
    console.log(req.headers);
    
    next();
  } catch (error) {
    res.status(500).json({ error: 'authToken Internal Server Error' });
  }
};

module.exports = authToken;
