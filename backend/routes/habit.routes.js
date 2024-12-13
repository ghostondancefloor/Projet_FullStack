const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit.controller');
const { authJwt } = require('../middlewares');

router.get('/user',authJwt.verifyToken, habitController.getUserHabits);

router.post('/',authJwt.verifyToken, habitController.createHabit);

router.get('/events', [authJwt.verifyToken], habitController.getHabitEvents);

router.delete('/:id', [authJwt.verifyToken], habitController.deleteHabit);

router.put('/:id', [authJwt.verifyToken], habitController.updateHabit);


module.exports = router;