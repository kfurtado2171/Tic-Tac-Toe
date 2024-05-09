// Import required modules
const express = require('express');
const router = express.Router(); // Create Express router
const Player = require('../models/Player'); // Import Player model

// Define route to get leaderboard data
router.get('/', async (req, res) => {
  try {
    // Find all players and retrieve their names and wins, sorted by wins in descending order
    const leaderboard = await Player.find({}, 'name wins').sort({ wins: -1 }).exec();
    // Respond with JSON data of the leaderboard
    res.json(leaderboard);
  } catch (err) {
    // Handle errors and send 500 status code with error message
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router; // Export router
