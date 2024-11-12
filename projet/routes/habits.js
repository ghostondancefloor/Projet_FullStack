const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const getHabitsCollection = require('../app').getHabitsCollection;
// GET /api/habits - Retrieve all habits
router.get('/', async (req, res) => {
    try {
        const habitsCollection = getHabitsCollection();
        const habits = await habitsCollection.find().toArray();
        res.json(habits);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to retrieve habits' });
    }
});

// POST /api/habits - Create a new habit
router.post('/', async (req, res) => {
    try {
        const habitsCollection = getHabitsCollection();
        const newHabit = req.body;
        const result = await habitsCollection.insertOne(newHabit);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create habit' });
    }
});

// GET /api/habits/:id - Get a specific habit by ID
router.get('/:id', async (req, res) => {
    try {
        const habitsCollection = getHabitsCollection();
        const habit = await habitsCollection.findOne({ _id: ObjectId(req.params.id) });
        habit ? res.json(habit) : res.status(404).json({ message: 'Habit not found' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to retrieve habit' });
    }
});

// PUT /api/habits/:id - Update a habit by ID
router.put('/:id', async (req, res) => {
    try {
        const habitsCollection = getHabitsCollection();
        const updates = req.body;
        const result = await habitsCollection.updateOne(
            { _id: ObjectId(req.params.id) },
            { $set: updates }
        );
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update habit' });
    }
});

// DELETE /api/habits/:id - Delete a habit by ID
router.delete('/:id', async (req, res) => {
    try {
        const habitsCollection = getHabitsCollection();
        const result = await habitsCollection.deleteOne({ _id: ObjectId(req.params.id) });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete habit' });
    }
});

module.exports = router;
