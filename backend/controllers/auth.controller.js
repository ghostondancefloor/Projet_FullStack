const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    // Create a new user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    // Save user in the database
    await user.save();

    res.send({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
// controllers/auth.controller.js
exports.signin = async (req, res) => {
  try {
    // Find the user
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).send({ message: 'User Not Found.' });
    }

    // Check password
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }

    // Sign JWT token
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signout = (req, res) => {
  req.session = null;
  res.status(200).send({ message: "You've been signed out!" });
};
