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
    one: { type: String, default: null },
    two: { type: String, default: null },
    three: { type: String, default: null },
    four: { type: String, default: null },
    five: { type: String, default: null },
    six: { type: String, default: null },
    seven: { type: String, default: null },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
