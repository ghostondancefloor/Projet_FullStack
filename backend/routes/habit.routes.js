const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit.controller');
const { authJwt } = require('../middlewares'); // Ensure you have this middleware imported

router.get('/user', authJwt.verifyToken, habitController.getUserHabits);

router.post('/', authJwt.verifyToken, habitController.createHabit);

router.get('/events', authJwt.verifyToken, habitController.getHabitEvents);

router.delete('/:id', authJwt.verifyToken, habitController.deleteHabit);

router.put('/:id', authJwt.verifyToken, habitController.updateHabit);

router.get('/summary', authJwt.verifyToken, habitController.getWeeklySummary);

// Route for updating the status of a specific day
// router.put('/:id/update-day-status', authJwt.verifyToken, habitController.updateHabitDayStatus);

module.exports = router;
