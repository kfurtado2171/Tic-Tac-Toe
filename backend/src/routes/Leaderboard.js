// routes/leaderboard.js

const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Get leaderboard data
router.get('/', async (req, res) => {
  try {
    const leaderboard = await Player.find({}, 'name wins').sort({ wins: -1 }).exec();
    res.json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
