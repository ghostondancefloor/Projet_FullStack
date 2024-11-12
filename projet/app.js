const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const cors = require('cors'); // Import cors for cross-origin requests

const app = express();
const port = 3000;

// MongoDB connection details
const user = "zouhria";
const password = "info734";
const address = "193.48.125.44";

// MongoDB URI with authentication
const uri = `mongodb://${user}:${password}@${address}:27017/?authMechanism=DEFAULT&authSource=admin`;

// Initialize MongoDB client
const client = new MongoClient(uri);

// Database and collection variables
let db;
let habitsCollection;

// Connect to MongoDB and get the habits collection
async function connectToMongo() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db('message_board');
        habitsCollection = db.collection('habits');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

// Middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // Enable CORS for cross-origin requests

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const habitsRouter = require('./routes/habits'); // Import habits router

// Use routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/habits', habitsRouter); // Use the habits router for /api/habits

// Function to provide the habits collection to the routes
function getCollection(name) {
    return db.collection(name);
}

module.exports.getCollection = getCollection;

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

connectToMongo();

module.exports = app;
