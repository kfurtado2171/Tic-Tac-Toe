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

module.exports = router;