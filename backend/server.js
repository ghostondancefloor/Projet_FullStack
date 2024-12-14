// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const session = require('express-session');
const cookieSession = require('cookie-session'); // Import cookie-session
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const createError = require('http-errors');
const rateLimit = require('express-rate-limit');
const { connectToMongo } = require('./config/db');
const config = require('./config/auth.config');

const indexRouter = require('./routes/index.routes');
const userRouter = require('./routes/user.routes');
const habitRouter = require('./routes/habit.routes');
const authRouter = require('./routes/auth.routes');

const app = express();

// CORS Configuration
var corsOptions = {
  origin: 'http://localhost:4200', // Allow requests from this origin
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

app.use(limiter);
// Session Management with cookie-session
app.use(
  cookieSession({
    name: 'Aymed-session',
    keys: [process.env.COOKIE_SECRET || 'your-secret-key'], // Use environment variable
    httpOnly: true, // Prevents client-side JS from accessing the cookie
    secure: false, // Set to true if using HTTPS
    sameSite: 'lax', // Adjust as needed ('strict', 'lax', 'none')
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Logger Middleware
app.use(logger('dev'));

// Static Files (if needed)
// app.use(express.static(path.join(__dirname, 'public')));

// // View Engine Setup
// app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');

// Routes
app.use('/', indexRouter);
app.use('/api/habits', habitRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
// Error Handling
app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res, next) => {
  // Set locals
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render error page
  res.status(err.status || 500);
  res.render('error');
});
app.options('*', cors(corsOptions));
// Start Server After Connecting to MongoDB
const PORT = process.env.PORT || 3000;

connectToMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

module.exports = app;
