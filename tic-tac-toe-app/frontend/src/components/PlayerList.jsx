import React, { useState, useEffect } from 'react';

function PlayerList({ onSelectPlayer }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch the list of players from the server
    fetch('/api/players')
      .then(response => response.json())
      .then(data => {
        setPlayers(data.players);
      })
      .catch(error => console.error('Error fetching players:', error));
  }, []);

  return (
    <div className="player-list">
      <h2>Available Players</h2>
      <ul>
        {players.map(player => (
          <li key={player._id}>
            {player.name}
            <button onClick={() => onSelectPlayer(player)}>Play with {player.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;
