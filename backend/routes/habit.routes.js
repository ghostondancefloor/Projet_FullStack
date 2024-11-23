// routes/habit.routes.js
const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit.controller');

router.get('/', habitController.getAllHabits);
router.post('/', habitController.createHabit);
router.get('/:id', habitController.getHabitById);
router.put('/:id', habitController.updateHabit);
router.delete('/:id', habitController.deleteHabit);

module.exports = router;
