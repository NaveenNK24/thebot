const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},{
  timestamps:true
});

const User = mongoose.model('User', userSchema);
module.exports = User;