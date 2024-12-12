const db = require('../models');
const User = db.user;
const Habit = require('../models/habit.model'); // Ensure Habit is defined if you're querying it

exports.getProfile = async (req, res) => {
  try {
    console.log('User ID:', req.userId); // Debug: Check if userId exists

    if (!req.userId) {
      return res.status(400).json({ message: 'No user ID found in request' });
    }

    // Fetch user details
    const user = await User.findById(req.userId).select('username email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch habits associated with the user
    const habits = await Habit.find({ userId: req.userId }).select('title startDate endDate description');
    console.log('Habits found:', habits); // Debug: Log fetched habits

    // Send response
    res.status(200).json({
      username: user.username,
      email: user.email,
      habits,
    });
  } catch (error) {
    console.error('Error fetching profile:', error.message); // Log error details
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
};
