// config/db.js
require('dotenv').config();
const mongoose = require('mongoose');
const dbConfig = require('./db.config');

async function connectToMongo() {
  try {
    await mongoose.connect(dbConfig.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: dbConfig.dbName,
    });
    console.log('Connected to MongoDB with Mongoose');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
}

module.exports = {
  connectToMongo,
};
