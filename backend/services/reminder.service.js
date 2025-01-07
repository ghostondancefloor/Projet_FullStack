const sgMail = require('@sendgrid/mail');
const Habit = require('../models/habit.model');
const cron = require('node-cron');

// Load SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send an email
async function sendReminderEmail(email, habit) {
  const message = {
    to: email,
    from: process.env.FROM_EMAIL,
    subject: `Reminder: Upcoming Habit - ${habit.habit}`,
    text: `Hi, just a reminder that your habit "${habit.habit}" is scheduled to start at ${habit.time}.`,
  };

  try {
    console.log(`Preparing to send email to: ${email}`);
    console.log(`Email content: ${JSON.stringify(message)}`);
    await sgMail.send(message);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error.response?.body?.errors || error.message);
  }
}

// Function to find habits and send reminders
async function sendUpcomingHabitReminders() {
  try {
    const now = new Date();
    const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    console.log('Now:', now);
    console.log('Two hours later:', twoHoursLater);

    // Fetch all habits and calculate exact start time
    const habits = await Habit.find().populate('userId', 'email');
    console.log('Fetched habits:', habits);

    const emailPromises = habits
      .filter((habit) => {
        const [hours, minutes] = habit.time.split(':').map(Number);
        const habitStartTime = new Date(habit.date);
        habitStartTime.setHours(hours, minutes, 0, 0);

        console.log(
          `Habit: ${habit.habit}, Start Time: ${habitStartTime}, Now: ${now}, Two Hours Later: ${twoHoursLater}`
        );

        return habitStartTime >= now && habitStartTime <= twoHoursLater;
      })
      .map((habit) => {
        const userEmail = habit.userId?.email;
        console.log(`Sending reminder for habit: ${habit.habit}, email: ${userEmail}`);
        if (userEmail) {
          return sendReminderEmail(userEmail, habit);
        }
      });

    await Promise.all(emailPromises);
    console.log('Reminders sent successfully.');
  } catch (error) {
    console.error('Error sending reminders:', error);
  }
}

// Schedule the reminder job to run every 15 minutes
cron.schedule('0,45 * * * *', () => {
  console.log('Running reminder job...');
  sendUpcomingHabitReminders();
});

module.exports = {
  sendUpcomingHabitReminders,
};