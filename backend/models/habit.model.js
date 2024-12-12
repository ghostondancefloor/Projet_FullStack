const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Habit', HabitSchema);
