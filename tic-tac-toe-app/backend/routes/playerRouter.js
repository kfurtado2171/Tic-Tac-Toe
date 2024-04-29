const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const playersFilePath = path.join(__dirname, '../data/players.json');
const scoresFilePath = path.join(__dirname, '../data/scores.json');

// Function to read/write players data from/to file
const readPlayersFile = () => {
  try {
    const playersData = fs.readFileSync(playersFilePath, 'utf8');
    return JSON.parse(playersData);
  } catch (err) {
    console.error('Error reading players file:', err);
    return [];
  }
};

const writePlayersFile = (players) => {
  try {
    fs.writeFileSync(playersFilePath, JSON.stringify(players, null, 2));
  } catch (err) {
    console.error('Error writing players file:', err);
  }
};

// Function to read/write scores data from/to file
const readScoresFile = () => {
  try {
    const scoresData = fs.readFileSync(scoresFilePath, 'utf8');
    return JSON.parse(scoresData);
  } catch (err) {
    console.error('Error reading scores file:', err);
    return [];
  }
};

const writeScoresFile = (scores) => {
  try {
    fs.writeFileSync(scoresFilePath, JSON.stringify(scores, null, 2));
  } catch (err) {
    console.error('Error writing scores file:', err);
  }
};

// Create a new player
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const players = readPlayersFile();

    players.push({ id: players.length + 1, name });

    writePlayersFile(players);

    res.json({ message: 'Player added successfully' });
  } catch (err) {
    console.error('Error adding player:', err);
    res.status(500).send('Server Error');
  }
});

// Add a new score
router.post('/add-score', async (req, res) => {
  const { playerId, winnerId } = req.body;

  try {
    if (!playerId || !winnerId) {
      return res.status(400).json({ error: 'Player ID and winner ID are required' });
    }

    const scores = readScoresFile();

    scores.push({ playerId, winnerId });

    writeScoresFile(scores);

    res.json({ message: 'Score added successfully' });
  } catch (err) {
    console.error('Error adding score:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
