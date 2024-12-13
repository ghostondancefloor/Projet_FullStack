const Habit = require('../models/habit.model');

exports.createHabit = async (req, res) => {
  try {
    console.log('Incoming Habit Data:', req.body); // Debugging request body

    const { habit, description, end, frequency, date, time, duration } = req.body;

    // Verify all required fields are present
    if (!duration) {
      return res.status(400).json({ message: 'Duration is required' });
    }

    const newHabit = new Habit({
      habit,
      description,
      end,
      frequency,
      date,
      time,
      duration,
      userId: req.userId, // Link habit to user
    });

    const savedHabit = await newHabit.save();
    res.status(201).json(savedHabit);
  } catch (error) {
    console.error('Error creating habit:', error);
    res.status(500).json({ message: 'Failed to create habit' });
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

exports.getHabitEvents = async (req, res) => {
  try {
    const userId = req.userId; // Authenticated user ID
    const habits = await Habit.find({ userId });

    const events = []; // Array to store all generated events

    habits.forEach((habit) => {
      const startDate = new Date(habit.date);
      const endDate = habit.end ? new Date(habit.end) : null;

      // Validate and parse time into hours and minutes
      const [hours, minutes] = habit.time.split(':').map((val) => parseInt(val, 10));

      // Daily Habit Logic
      if (habit.frequency === 'Daily') {
        let currentDate = new Date(startDate);
        while (!endDate || currentDate <= endDate) {
          // Generate event for the current date
          const eventStart = new Date(currentDate);
          eventStart.setHours(hours, minutes);

          const eventEnd = new Date(eventStart);
          eventEnd.setMinutes(eventEnd.getMinutes() + habit.duration);

          events.push({
            id: habit._id.toString(), // Include habit ID for deletion
            title: habit.habit,
            start: eventStart.toISOString(),
            end: eventEnd.toISOString(),
            description: habit.description,
          });

          currentDate.setDate(currentDate.getDate() + 1); // Increment to the next day
        }
      }

      // Weekly Habit Logic
      if (habit.frequency === 'Weekly' && habit.days) {
        const daysOfWeek = Object.keys(habit.days).filter((key) => habit.days[key]);

        daysOfWeek.forEach((dayKey) => {
          const targetDay = parseInt(dayKey.replace('day', ''), 10); // Extract day of the week (0-6)
          let currentDate = new Date(startDate);

          // Adjust currentDate to the first occurrence of the target day
          while (currentDate.getDay() !== targetDay) {
            currentDate.setDate(currentDate.getDate() + 1);
          }

          // Generate event for each occurrence of the target day
          while (!endDate || currentDate <= endDate) {
            const eventStart = new Date(currentDate);
            eventStart.setHours(hours, minutes);

            const eventEnd = new Date(eventStart);
            eventEnd.setMinutes(eventEnd.getMinutes() + habit.duration);

            events.push({
              id: habit._id.toString(), // Include habit ID for deletion
              title: habit.habit,
              start: eventStart.toISOString(),
              end: eventEnd.toISOString(),
              description: habit.description,
            });

            currentDate.setDate(currentDate.getDate() + 7); // Move to the next week
          }
        });
      }
    });

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching habit events:', error);
    res.status(500).json({ message: 'Failed to fetch habit events' });
  }
};


exports.deleteHabit = async (req, res) => {
  try {
    const habitId = req.params.id;
    const deletedHabit = await Habit.findByIdAndDelete(habitId);

    if (!deletedHabit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.status(200).json({ message: 'Habit deleted successfully' });
  } catch (error) {
    console.error('Error deleting habit:', error);
    res.status(500).json({ message: 'Failed to delete habit' });
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const habitId = req.params.id;
    const updatedHabit = req.body;

    const habit = await Habit.findByIdAndUpdate(habitId, updatedHabit, {
      new: true,
    });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.status(200).json(habit);
  } catch (error) {
    console.error('Error updating habit:', error);
    res.status(500).json({ message: 'Failed to update habit', error });
  }
};

