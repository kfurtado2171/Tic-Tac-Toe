import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

function MainMenu({ onPlayerRegistered }) {
  const [playerName, setPlayerName] = useState('');

  const handleRegister = async () => {
    try {
      // Make a POST request to your backend endpoint (/register) to add the player to the database
      const response = await axios.post('/register', { username: playerName });
      console.log(response.data); // Log the response from the server
      // Call the callback function to notify the parent component that the player is registered
      onPlayerRegistered(playerName);
    } catch (error) {
      console.error('Error registering player:', error);
      // Handle any errors here
    }
  };

  return (
    <div className="main-menu">
      <h1>Welcome to Tic-Tac-Toe</h1>
      <div>
        <label>Enter your name:</label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      <br />
      <button onClick={handleRegister}>Play</button>
    </div>
  );
}

export default MainMenu;