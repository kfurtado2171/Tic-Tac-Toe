import React, { useState } from 'react';
import './App.css';
import ScoreBoard from './components/ScoreBoard';
import './bootstrap.min.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playerXScore, setPlayerXScore] = useState(0);
  const [playerOScore, setPlayerOScore] = useState(0);

  const handleClick = (index) => {
    const newBoard = [...board];
    if (calculateWinner(newBoard) || newBoard[index]) {
      return;
    }
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    const winner = calculateWinner(newBoard);
    if (winner) {
      updateScores(winner);
    }
  };

  const calculateWinner = (squares) => {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const updateScores = (winner) => {
    if (winner === 'X') {
      setPlayerXScore(prevScore => prevScore + 1);
    } else if (winner === 'O') {
      setPlayerOScore(prevScore => prevScore + 1);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderStatus = () => {
    const winner = calculateWinner(board);
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every(square => square !== null)) {
      return 'Draw';
    } else {
      return `Next Player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  const renderBoard = () => {
    return board.map((square, index) => (
      <button key={index} className="square" onClick={() => handleClick(index)}>
        {square}
      </button>
    ));
  };

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>
      <ScoreBoard playerXScore={playerXScore} playerOScore={playerOScore}/>
      <div className="board">{renderBoard()}</div>
      <div className="status">{renderStatus()}</div>
      {(calculateWinner(board) || board.every(square => square !== null)) && (
        <button onClick={resetGame}>Play Again</button>
      )}
    </div>
  );
}

export default App;
