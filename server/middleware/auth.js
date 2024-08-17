const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Retrieve the token from the Authorization header
  console.log("Auth", req.headers);
  
  // const authHeader = req.headers['authorization'];
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  console.log("Auth ",authHeader);
  
  if (!authHeader) return res.status(401).json({ message: 'Auth No token provided' });

  // Extract the token
  const token = authHeader.split(' ')[1]; // Assumes "Bearer TOKEN"

  if (!token) return res.status(401).json({ message: 'No token provided' });

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user;
    next();
  });
};

module.exports = auth;
