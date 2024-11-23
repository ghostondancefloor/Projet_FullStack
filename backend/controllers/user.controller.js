// controllers/user.controller.js
const db = require('../models');
const User = db.user;

exports.userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId, '-password'); // Exclude password
    if (!user) {
      return res.status(404).send({ message: 'User Not Found' });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
