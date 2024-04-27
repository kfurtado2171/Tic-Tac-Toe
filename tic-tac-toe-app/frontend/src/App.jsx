import React, { useState } from 'react';
import './App.css'; 
import ScoreBoard from './components/ScoreBoard'; 
import './bootstrap.min.css';

function App() {
  // State to manage the tic-tac-toe board
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playerXScore, setPlayerXScore] = useState(0); // State for Player X score
  const [playerOScore, setPlayerOScore] = useState(0); // State for Player O score

  // Function to handle square clicks
  const handleClick = (index) => {
    const newBoard = [...board];
    if (calculateWinner(newBoard) || newBoard[index]) {
      return;
    }
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  // Function to calculate the winner
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

  // Function to update scores and reset the board
  const updateScoresAndResetBoard = (winner) => {
    if (winner === 'X') {
      setPlayerXScore(playerXScore + 1);
    } else if (winner === 'O') {
      setPlayerOScore(playerOScore + 1);
    }
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  // Function to render the status message
  const renderStatus = () => {
    const winner = calculateWinner(board);
    if (winner) {
      updateScoresAndResetBoard(winner);
      return `Winner: ${winner}`;
    } else {
      return `Next Player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  // Function to render the game board
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
      <ScoreBoard playerXScore={playerXScore} playerOScore={playerOScore} /> 
      <div className="board">{renderBoard()}</div>
      <div className="status">{renderStatus()}</div>
    </div>
  );
}

export default App;
