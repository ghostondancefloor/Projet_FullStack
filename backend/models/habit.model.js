const mongoose = require('mongoose');

// Define the schema for the habit
const habitSchema = new mongoose.Schema({
  habit: { type: String, required: true },
  description: { type: String, required: true },
  end: { type: String },
  frequency: { type: String, required: true },
  date: { type: String }, // Start date
  time: { type: String, required: true }, // Start time
  duration: { type: Number, required: true, min: 1 }, // Duration in minutes
  streak: { type: Number, default: 0 },
  days: {
    one: { type: Object, default: null }, // Example: { date: 'Monday', status: 'Pending' }
    two: { type: Object, default: null },
    three: { type: Object, default: null },
    four: { type: Object, default: null },
    five: { type: Object, default: null },
    six: { type: Object, default: null },
    seven: { type: Object, default: null },
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// Add indexes for optimized querying
habitSchema.index({ userId: 1 });
habitSchema.index({ frequency: 1 });
habitSchema.index({ date: 1 });

// Export the model
const Habit = mongoose.model('Habit', habitSchema);
module.exports = Habit;
