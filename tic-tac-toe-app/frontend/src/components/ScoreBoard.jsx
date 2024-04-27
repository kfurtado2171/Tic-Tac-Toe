import React from 'react';

function ScoreBoard({ playerXScore, playerOScore }) {
  return (
    <div className="score-board">
      <h3>Scoreboard</h3>
      <div>
        Player X: {playerXScore}
      </div>
      <div>
        Player O: {playerOScore}
      </div>
    </div>
  );
}

export default ScoreBoard;
