const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const playerRoutes = require('./routes/Player');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 5050;
// this should always be in .env

//const uri = "mongodb+srv://kfurtado14:0nuwp6YEh2pCKZcS@todo.n49mnlt.mongodb.net/?retryWrites=true&w=majority&appName=Todo"
const uri = "mongodb+srv://kfurtado14:zIOQyNZQ5GQKofCu@players.gvpdlpn.mongodb.net/?retryWrites=true&w=majority&appName=Players"
// Connect to MongoDB using environment variable
mongoose.set('strictQuery', false)

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use('/api/players', playerRoutes);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');

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

server.listen(port, () => console.log(`Server listening on port ${port}`));
