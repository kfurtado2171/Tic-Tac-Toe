import React from 'react';

function ScoreBoard({ playerXScore, playerOScore }) {
  return (
    <div className="score-board">
      <h2 style={{ fontSize: '45px'}}>Scoreboard</h2>
      <div>
        Player X: {playerXScore}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Player O: {playerOScore}
      </div>
    </div>
  );
}

export default ScoreBoard;
