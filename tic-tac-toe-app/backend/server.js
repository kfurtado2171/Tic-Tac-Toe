const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5173;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'frontend/build' directory
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Define a function to save player data to a JSON file
const savePlayerData = (playerData) => {
  const players = playerData.map(player => ({ name: player })); // Create player objects
  const jsonData = JSON.stringify(players, null, 2); // Stringify with indentation for readability
  fs.writeFile('players.json', jsonData, (err) => {
    if (err) {
      console.error('Error writing player data:', err);
    } else {
      console.log('Player data saved successfully.');
    }
  });
};

// Route for handling the "Play" button click
app.post('http://localhost:5173/play', (req, res) => {
  console.log('POST request received at /play endpoint');
  // Gather player data from the request (if needed)
  const { player1Name, player2Name } = req.body;
  console.log('Player 1 Name:', player1Name);
  console.log('Player 2 Name:', player2Name);

  // Create player objects (example)
  const player1 = { name: player1Name };
  const player2 = { name: player2Name };

  // Save player data to a JSON file
  savePlayerData([player1, player2]);

  // Respond with success message or redirect to another page
  res.send('Player data saved successfully');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
