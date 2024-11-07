const Token = require('../models/upstoxAuthToken');

// Function to get the Upstox token from the database
const getUpstoxToken = async () => {
    try {
        const tokenDoc = await Token.findOne(); // Fetch the first token document
        return tokenDoc ? tokenDoc.upstoxToken : null; // Return the token or null if not found
    } catch (error) {
        console.error('Error retrieving Upstox token from DB:', error);
        throw new Error('Failed to retrieve Upstox token');
    }
};

module.exports = {
    getUpstoxToken,
};