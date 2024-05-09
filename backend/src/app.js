// Import required modules
const express = require('express'); // Import Express framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction
const bodyParser = require('body-parser'); // Middleware to parse request bodies
const cors = require('cors'); // Middleware for enabling CORS
const http = require('http'); // HTTP server module
const socketIo = require('socket.io'); // Socket.io for real-time communication

// Import route modules
const playerRoutes = require('./routes/Player'); // Player routes
const leaderboardRoutes = require('./routes/Leaderboard'); // Leaderboard routes

// Create an Express app
const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server); // Create a Socket.io server instance

const port = process.env.PORT || 5050; // Set the port number

// MongoDB connection URI
const uri = "mongodb+srv://kfurtado14:zIOQyNZQ5GQKofCu@players.gvpdlpn.mongodb.net/?retryWrites=true&w=majority&appName=Players";

// Connect to MongoDB using environment variable
mongoose.set('strictQuery', false); // Disable strict query mode

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected')) // Log success message
  .catch(err => console.error(err)); // Log error if connection fails

// Middlewares
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse request bodies as JSON

// Define routes
app.use('/api/players', playerRoutes); // Player routes
app.use('/api/leaderboard', leaderboardRoutes); // Leaderboard routes

// Socket.io connection
io.on('connection', (socket) => { // Handle socket connection
  console.log('New client connected'); // Log new connection

  // Handle player selection
  socket.on('selectPlayer', (selectedPlayerId) => {
    // Emit an event to the selected player's socket
    io.emit('playerSelected', selectedPlayerId);
  });

  // Handle game actions, such as moves
  socket.on('move', (moveData) => {
    // Emit the move to the opponent's socket
    io.emit('opponentMove', moveData);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
server.listen(port, () => console.log(`Server listening on port ${port}`));
