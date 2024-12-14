const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  habit: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  end: {
    type: String,
  },
  frequency: {
    type: String, // e.g., Daily, Weekly
    required: true,
  },
  date: {
    type: String, // Start date
  },
  time: {
    type: String, // Start time
    required: true,
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
    min: 1,
  },
  streak: {
    type: Number,
    default: 0,
  },
  days: {
    one: { type: Object, default: null }, // Allows objects for each day
    two: { type: Object, default: null },
    three: { type: Object, default: null },
    four: { type: Object, default: null },
    five: { type: Object, default: null },
    six: { type: Object, default: null },
    seven: { type: Object, default: null },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
