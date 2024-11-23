// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { verifySignUp } = require('../middlewares');
const authController = require('../controllers/auth.controller');

router.post(
  '/signup',
  [verifySignUp.checkDuplicateUsernameOrEmail],
  authController.signup
);

router.post('/signin', authController.signin);

router.post('/signout', authController.signout);

module.exports = router;
