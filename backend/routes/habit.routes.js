const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit.controller');
const { authJwt } = require('../middlewares');

router.get('/user',authJwt.verifyToken, habitController.getUserHabits);

router.post('/',authJwt.verifyToken, habitController.createHabit);

module.exports = router;