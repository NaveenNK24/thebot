const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const user = new User({ username, email, password: hashedPassword });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    // console.log('User found:', user);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    } else{
      return res.status(200).json({
        _id:user._id,
        username:user.username,
        email:user.email,
        token: genToken(user._id),
        status: "Login Successful"
      })
    }
  } catch (error) {
    console.log('Error during login:', error);
    res.status(500).json({ error: error.message });
  }
};

// Generate JWT token
const genToken = (id) =>{
  return jwt.sign({ id}, process.env.JWT_SECRET, { expiresIn: '1d' });
} 

exports.getUser = async (req, res) => {
  try {
    // Assuming req.user contains the user's ID
    const { id } = req.user;

    // Find the user by ID
    const user = await User.findById(id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract the username from the user document
    const { username } = user;

    // Respond with the username
    return res.status(200).json({ username });
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ error: error.message });
  }
};
