const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 5173;

let playersList = []; // Array to store active player names

// Serve static files from the 'frontend/build' directory
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for 'joinGameLobby' event
  socket.on('joinGameLobby', (playerName) => {
    console.log(`${playerName} joined the game lobby`);
    playersList.push(playerName); // Add player name to playersList
    io.emit('updatePlayersList', playersList); // Emit updated playersList to all clients
  });

  // Listen for disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});