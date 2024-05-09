// Import React library
import React from 'react';

// Define a functional component called ScoreBoard
function ScoreBoard({ playerXScore, playerOScore, player1Name, player2Name }) {
  // Render the ScoreBoard component
  return (
    <div className="score-board"> {/* Scoreboard container */}
      <h2 style={{ fontSize: '45px'}}>Scoreboard</h2> {/* Scoreboard heading */}
      <div> {/* Display player scores */}
        {player1Name} (X): {playerXScore}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{player2Name} (O): {playerOScore}
      </div>
    </div>
  );
}

// Export the ScoreBoard component as default
export default ScoreBoard;
