// models/user.model.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  roles: [
    {
      type: String,
      enum: ['user', 'admin', 'moderator'],
      default: 'user',
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
