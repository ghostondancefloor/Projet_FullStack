// routes/user.routes.js
const express = require('express');
const router = express.Router();
const { authJwt } = require('../middlewares');
const userController = require('../controllers/user.controller');

router.get('/profile', [authJwt.verifyToken], userController.getProfile);

module.exports = router;
