const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;

// Verify Token Middleware
verifyToken = (req, res, next) => {
  let token =
    req.headers['x-access-token'] ||
    req.headers['authorization']?.split(' ')[1]; // Extract Bearer token

  console.log('Token received:', token); // Debug log

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err); // Debug log
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};


// Check Admin Role Middleware
isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      console.error('Error fetching user:', err); // Debug log for errors
      return res.status(500).send({ message: err.message });
    }

    if (user?.roles?.includes('admin')) {
      next();
      return;
    }

    res.status(403).send({ message: 'Require Admin Role!' });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
};

module.exports = authJwt;
