const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Create a new player
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const newPlayer = new Player({ name });
    const savedPlayer = await newPlayer.save();
    res.json(savedPlayer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update player's record when they win
router.put('/:playerName/wins', async (req, res) => {
  const { playerName } = req.params;

  try {
    const player = await Player.findOne({ name: playerName });
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    // Increment the player's wins by 1
    player.wins += 1;
    await player.save();
    res.json({ message: 'Player record updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
