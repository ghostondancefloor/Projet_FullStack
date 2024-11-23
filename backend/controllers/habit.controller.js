// controllers/habit.controller.js
const HabitModel = require('../models/habit.model');

exports.getAllHabits = async (req, res) => {
  try {
    const habits = await HabitModel.getAllHabits();
    res.json(habits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve habits' });
  }
};

exports.getHabitById = async (req, res) => {
  try {
    const habit = await HabitModel.getHabitById(req.params.id);
    if (habit) {
      res.json(habit);
    } else {
      res.status(404).json({ message: 'Habit not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve habit' });
  }
};

exports.createHabit = async (req, res) => {
  try {
    const newHabit = req.body;
    const result = await HabitModel.createHabit(newHabit);
    res.status(201).json(result.ops[0]); // Return the created habit
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create habit' });
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const updates = req.body;
    const result = await HabitModel.updateHabit(req.params.id, updates);
    res.json({ message: 'Habit updated', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update habit' });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    const result = await HabitModel.deleteHabit(req.params.id);
    res.json({ message: 'Habit deleted', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete habit' });
  }
};
