const Habit = require('../models/habit.model');

exports.createHabit = async (req, res) => {
  try {
    // Retrieve userId from session or token
    const userId = req.session?.userId || req.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: Missing userId' });
    }

    const { title, startDate, endDate, description } = req.body;

    const newHabit = new Habit({
      title,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      description,
      userId, // Attach the userId to the habit
    });

    const savedHabit = await newHabit.save();
    res.status(201).json(savedHabit);
  } catch (error) {
    console.error('Error creating habit:', error);
    res.status(500).json({ message: 'Failed to create habit', error });
  }
};


exports.getUserHabits = async (req, res) => {
  try {
    console.log('User ID in request:', req.userId); // Debug log
    if (!req.userId) {
      return res.status(401).send({ message: 'Unauthorized: Missing userId' });
    }

    const habits = await Habit.find({ userId: req.userId });
    res.status(200).json(habits);
  } catch (error) {
    console.error('Error fetching user habits:', error); // Debug log
    res.status(500).json({ message: 'Failed to fetch habits', error });
  }
};


