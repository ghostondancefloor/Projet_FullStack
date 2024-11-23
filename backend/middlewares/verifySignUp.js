// middlewares/verifySignUp.js
const db = require('../models');
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check for duplicate username
    const userByUsername = await User.findOne({ username: req.body.username });
    if (userByUsername) {
      return res.status(400).send({ message: 'Failed! Username is already in use!' });
    }

    // Check for duplicate email
    const userByEmail = await User.findOne({ email: req.body.email });
    if (userByEmail) {
      return res.status(400).send({ message: 'Failed! Email is already in use!' });
    }

    next(); // Proceed if no duplicates
  } catch (err) {
    res.status(500).send({ message: err.message || 'Internal Server Error' });
  }
};

module.exports = {
  checkDuplicateUsernameOrEmail,
};
