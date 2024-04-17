import './bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Register from './components/Register';
import UserList from './components/UserList';
import TicTacToe from './components/TicTacToe';

const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});


function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [game, setGame] = useState({ board: Array(3).fill(Array(3).fill('')) });

  useEffect(() => {
    socket.on('users', (users) => {
      setUsers(users);
    });
    socket.on('game', (game) => {
      setGame(game);
    });
  }, []);

  const handleRegister = (username) => {
    setUser(username);
    socket.emit('register', username);
  };

  const handlePlay = (opponentId) => {
    socket.emit('play', { user, opponentId });
  };

  const handleMove = (row, col) => {
    socket.emit('move', { user, row, col });
  };

  return (
    <div>
      {!user ? (
        <Register onRegister={handleRegister} />
      ) : game.winner ? (
        <div>
          <h1>{game.winner} wins!</h1>
        </div>
      ) : (
        <>
          <h1>Welcome, {user}!</h1>
          <UserList users={users} onPlay={handlePlay} />
          <TicTacToe board={game.board} onMove={handleMove} />
        </>
      )}
    </div>
  );
}

export default App;
