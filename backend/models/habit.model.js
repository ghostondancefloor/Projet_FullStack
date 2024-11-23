// models/habit.model.js
const { ObjectId } = require('mongodb');
const { getDb } = require('../config/db');

class HabitModel {
  static getAllHabits() {
    const db = getDb();
    return db.collection('habits').find().toArray();
  }

  static getHabitById(id) {
    const db = getDb();
    return db.collection('habits').findOne({ _id: ObjectId(id) });
  }

  static createHabit(habit) {
    const db = getDb();
    return db.collection('habits').insertOne(habit);
  }

  static updateHabit(id, updates) {
    const db = getDb();
    return db.collection('habits').updateOne(
      { _id: ObjectId(id) },
      { $set: updates }
    );
  }

  static deleteHabit(id) {
    const db = getDb();
    return db.collection('habits').deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = HabitModel;
