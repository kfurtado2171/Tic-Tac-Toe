const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }));

const server = http.createServer(app);
const io = socketIo(server);

let users = [];
let games = [];

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('register', (username) => {
    const user = { id: socket.id, username, wins: 0 };
    users.push(user);
    io.emit('users', users);
    console.log('Registered user:', user);
    updateDb();
  });

  socket.on('play', ({ user, opponentId }) => {
    const opponent = users.find((u) => u.id === opponentId);
    const game = { players: [user, opponent.username], board: Array(3).fill(Array(3).fill('')) };
    games.push(game);
    io.to(opponentId).emit('game', game);
    io.to(socket.id).emit('game', game);
  });

  socket.on('move', ({ user, row, col }) => {
    const game = games.find((g) => g.players.includes(user));
    game.board[row][col] = user;

    const winner = checkWinner(game.board);

    if (winner) {
      game.winner = winner;
      const winnerUser = users.find((u) => u.username === winner);
      winnerUser.wins++;
      io.emit('users', users);
      console.log('Winner:', winner);
      updateDb();
    }

    io.to(game.players[0]).emit('game', game);
    io.to(game.players[1]).emit('game', game);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    users = users.filter((user) => user.id !== socket.id);
    io.emit('users', users);
    console.log('Updated users:', users);
    updateDb();
  });
});

function updateDb() {
  const fs = require('fs');
  fs.writeFile('db.json', JSON.stringify({ users, games }), (err) => {
    if (err) {
      console.error('Error writing to db.json:', err);
    } else {
      console.log('db.json updated');
    }
  });
}

function checkWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
