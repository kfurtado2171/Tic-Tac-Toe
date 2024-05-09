// Import required modules
const express = require('express');
const router = express.Router(); // Create Express router
const Player = require('../models/Player'); // Import Player model

// Define route to create a new player
router.post('/', async (req, res) => {
  const { name } = req.body; // Extract player's name from request body

  try {
    // Create a new player instance with provided name
    const newPlayer = new Player({ name });
    // Save the new player to the database
    const savedPlayer = await newPlayer.save();
    // Respond with JSON data of the saved player
    res.json(savedPlayer);
  } catch (err) {
    // Handle errors and send 500 status code with error message
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Define route to update player's record when they win
router.put('/:playerName/wins', async (req, res) => {
  const { playerName } = req.params; // Extract player's name from URL parameter

  try {
    // Find the player in the database by their name
    const player = await Player.findOne({ name: playerName });
    if (!player) {
      // If player not found, send 404 status code with error message
      return res.status(404).json({ message: 'Player not found' });
    }
    // Increment the player's wins by 1
    player.wins += 1;
    // Save the updated player record
    await player.save();
    // Respond with success message
    res.json({ message: 'Player record updated successfully' });
  } catch (err) {
    // Handle errors and send 500 status code with error message
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router; // Export router
