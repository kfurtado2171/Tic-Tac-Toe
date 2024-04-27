import React from 'react';

function ScoreBoard({ playerXScore, playerOScore, player1Name, player2Name }) {
  return (
    <div className="score-board">
      <h2 style={{ fontSize: '45px'}}>Scoreboard</h2>
      <div>
        {player1Name} (X): {playerXScore}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{player2Name} (O): {playerOScore}
      </div>
    </div>
  );
}

export default ScoreBoard;
