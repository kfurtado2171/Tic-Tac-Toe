import React, { useState, useEffect } from 'react';
import './App.css';
import ScoreBoard from './components/ScoreBoard';
import './bootstrap.min.css';
import io from 'socket.io-client'; 

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playerXScore, setPlayerXScore] = useState(0);
  const [playerOScore, setPlayerOScore] = useState(0);
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [playerName, setPlayerName] = useState('');
  const [playersList, setPlayersList] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:5173');
  
    socket.on('connect', () => {
      console.log('Connected to server');
    });
  
    socket.on('updatePlayersList', (players) => {
      console.log('Received updated players list:', players);
      setPlayersList(players);
    });
  
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  
    socket.on('error', (error) => {
      console.error('Socket connection error:', error);
      // Handle error gracefully, e.g., display error message to the user
    });
  
    return () => {
      socket.disconnect();
    };
  }, []);
  
  const renderGameLobby = () => {
    return (
      <div className="game-lobby">
        <h1>Game Lobby</h1>
        <h2>Active Players:</h2>
        {playersList.length === 0 ? (
          <p>No active players currently available.</p>
        ) : (
          <ul>
            {playersList.map((player, index) => (
              <li key={index} onClick={() => handlePlayerSelection(player)}>
                {player}
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => setShowMainMenu(true)}>Back to Main Menu</button>
      </div>
    );
  };
 

  const handleStartGame = () => {
    if (playerName.trim() !== '') { // Ensure playerName is not empty
      const socket = io('http://localhost:5173'); // Connect to the server
      socket.emit('joinGameLobby', playerName); // Emit an event with the playerName to the server
      setShowMainMenu(false); // Hide the main menu
    } else {
      // Handle case where playerName is empty
      alert('Please enter your name before entering the game lobby.');
    }
  };
  

  const handlePlayerNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handlePlayerSelection = (player) => {
    setSelectedPlayer(player);
  };

  const renderMainMenu = () => {
    return (
      <div className="main-menu">
        <h1 style={{ marginTop: '100px' }}>Welcome to Tic-Tac-Toe</h1>
        <div>
          <br />
          <label>Enter Your Name:&nbsp;</label>
          <input
            type="text"
            value={playerName}
            onChange={handlePlayerNameChange}
          />
        </div>
        <br />
        <button onClick={handleStartGame}>Enter Game Lobby</button>
      </div>
    );
  };

  // const renderGameLobby = () => {
  //   return (
  //     <div className="game-lobby">
  //       <h1>Game Lobby</h1>
  //       <h2>Active Players:</h2>
  //       <ul>
  //         {playersList.map((player, index) => (
  //           <li key={index} onClick={() => handlePlayerSelection(player)}>
  //             {player}
  //           </li>
  //         ))}
  //       </ul>
  //       <button onClick={() => setShowMainMenu(true)}>Back to Main Menu</button>
  //     </div>
  //   );
  // };

  return showMainMenu ? renderMainMenu() : renderGameLobby();
}

export default App;