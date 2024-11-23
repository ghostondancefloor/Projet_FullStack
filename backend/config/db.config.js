// config/db.config.js
require('dotenv').config(); // Load environment variables

module.exports = {
  uri: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:27017/?authMechanism=DEFAULT&authSource=admin`,
  dbName: process.env.DB_NAME,
};
