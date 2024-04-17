import React from 'react';

function TicTacToe({ board, onMove }) {
  return (
    <div>
      <h2>Tic Tac Toe</h2>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className="cell"
                onClick={() => onMove(rowIndex, cellIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicTacToe;
