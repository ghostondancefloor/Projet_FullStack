// middlewares/authJwt.js
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

const verifyToken = (req, res, next) => {
  let token = req.session.token || req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  // If token is in the Authorization header in the format 'Bearer <token>'
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trim();
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = {
  verifyToken,
};
