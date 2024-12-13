const db = require('../models');
const User = db.user;
const Habit = require('../models/habit.model'); // Ensure Habit is defined if you're querying it

exports.getProfile = async (req, res) => {
  try {
    // Fetch user details
    const user = await User.findById(req.userId).select('username email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch habits for the user
    const habits = await Habit.find({ userId: req.userId }).select(
      'habit date time duration description'
    );

    // Return the user profile and habits
    res.status(200).json({
      username: user.username,
      email: user.email,
      habits,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Failed to fetch profile', error });
  }
};

