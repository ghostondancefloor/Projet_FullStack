const Habit = require('../models/habit.model');

exports.createHabit = async (req, res) => {
  try {
    console.log('Incoming Habit Data:', req.body);

    const { habit, description, end, frequency, date, time, duration, days } = req.body;

    if (!habit || !frequency || !date || !time || !duration) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // Process days for weekly habits
    const processedDays = days
      ? {
          one: days.one ? { date: 'Monday', status: 'Pending' } : null,
          two: days.two ? { date: 'Tuesday', status: 'Pending' } : null,
          three: days.three ? { date: 'Wednesday', status: 'Pending' } : null,
          four: days.four ? { date: 'Thursday', status: 'Pending' } : null,
          five: days.five ? { date: 'Friday', status: 'Pending' } : null,
          six: days.six ? { date: 'Saturday', status: 'Pending' } : null,
          seven: days.seven ? { date: 'Sunday', status: 'Pending' } : null,
        }
      : {};

    const newHabit = new Habit({
      habit,
      description,
      end,
      frequency,
      date,
      time,
      duration,
      days: processedDays,
      userId: req.userId,
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
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized: Missing userId' });
    }

    const habits = await Habit.find({ userId: req.userId }).select('-__v'); // Exclude version field
    res.status(200).json(habits);
  } catch (error) {
    console.error('Error fetching user habits:', error);
    res.status(500).json({ message: 'Failed to fetch habits' });
  }
};

exports.getHabitEvents = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId }).select('habit date time duration frequency days end description');
    const events = [];
    const today = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(today.getMonth() + 6);

    habits.forEach((habit) => {
      const startDate = new Date(habit.date);
      const endDate = habit.end ? new Date(habit.end) : sixMonthsFromNow;

      // Skip habits outside of the defined timeframe
      if (endDate < today) return;

      const [hours, minutes] = habit.time.split(':').map(Number);

      if (habit.frequency === 'Daily') {
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          events.push(generateEvent(habit, currentDate, hours, minutes));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      } else if (habit.frequency === 'Weekly') {
        const daysOfWeek = Object.keys(habit.days).filter((key) => habit.days[key]);

        daysOfWeek.forEach((dayKey) => {
          const targetDay = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'].indexOf(dayKey) + 1;
          let currentDate = new Date(startDate);

          // Align current date to the target weekday
          while (currentDate.getDay() !== targetDay) {
            currentDate.setDate(currentDate.getDate() + 1);
          }

          while (currentDate <= endDate) {
            events.push(generateEvent(habit, currentDate, hours, minutes));
            currentDate.setDate(currentDate.getDate() + 7); // Increment by a week
          }
        });
      }
    });

    console.log(`Generated ${events.length} events`);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching habit events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

function generateEvent(habit, date, hours, minutes) {
  const eventStart = new Date(date);
  eventStart.setHours(hours, minutes);

  const eventEnd = new Date(eventStart);
  eventEnd.setMinutes(eventEnd.getMinutes() + habit.duration);

  return {
    id: habit._id.toString(),
    title: habit.habit,
    start: eventStart.toISOString(),
    end: eventEnd.toISOString(),
    description: habit.description,
  };
}

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
    const { id } = req.params;
    const updatedFields = req.body;

    const habit = await Habit.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.status(200).json(habit);
  } catch (error) {
    console.error('Error updating habit:', error);
    res.status(500).json({ message: 'Failed to update habit' });
  }
};

exports.getWeeklySummary = async (req, res) => {
  try {
    const { period } = req.query;

    if (!['week', 'month'].includes(period)) {
      return res.status(400).json({ message: 'Invalid period specified' });
    }

    const now = new Date();
    const startDate = period === 'week' ? new Date(now.setDate(now.getDate() - now.getDay())) : new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = period === 'week' ? new Date(now.setDate(startDate.getDate() + 6)) : new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const habits = await Habit.find({ userId: req.userId });

    const summary = habits.map((habit) => ({
      _id: habit._id,
      habit: habit.habit,
      description: habit.description,
      streak: habit.streak,
      days: Object.keys(habit.days)
        .filter((key) => habit.days[key]?.date && new Date(habit.days[key].date) >= startDate && new Date(habit.days[key].date) <= endDate)
        .map((key) => habit.days[key]),
    }));

    res.status(200).json(summary);
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ message: 'Failed to fetch summary' });
  }
};
