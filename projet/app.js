const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// MongoDB connection details
const user = "iddouchi";
const password = "info734";
const address = "193.48.125.44";

// MongoDB URI with authentication
const uri = `mongodb://${user}:${password}@${address}:27017/?authMechanism=DEFAULT&authSource=admin`;

// Initialize MongoDB client
const client = new MongoClient(uri);

// Database and collection variables
let messagesCollection;

// Connect to MongoDB
async function connectToMongo() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db('message_board'); // Use your desired database
        messagesCollection = db.collection('iddouchi'); // Create or use the 'messages' collection
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

connectToMongo();


// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
// Use the express.json() middleware to parse JSON request bodies
app.use(express.json());
app.use(express.static('public')); // Serve static files
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
