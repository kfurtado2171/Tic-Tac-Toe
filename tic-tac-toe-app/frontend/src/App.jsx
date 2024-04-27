import React, { useState } from 'react';
import './App.css';
import ScoreBoard from './components/ScoreBoard';
import './bootstrap.min.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playerXScore, setPlayerXScore] = useState(0);
  const [playerOScore, setPlayerOScore] = useState(0);
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

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

  const handleStartGame = () => {
    setShowMainMenu(false);
  };

  const renderMainMenu = () => {
    return (
      <div className="main-menu">
        <h1 style={{ marginTop: '100px' }}>Welcome to Tic-Tac-Toe</h1>
        <div>
          <br />
          <label>Player 1 Name:&nbsp;</label>
          <input
            type="text"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />
        </div>
        <div>
          <br />
          <label>Player 2 Name:&nbsp;</label>
          <input
            type="text"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />
        </div>
        <br />
        <button onClick={handleStartGame}>Play</button>
      </div>
    );
  };

  const renderBoard = () => {
    return board.map((square, index) => (
      <button key={index} className="square" onClick={() => handleClick(index)}>
        {square}
      </button>
    ));
  };

  const renderStatus = () => {
    const winner = calculateWinner(board);
    if (winner) {
      return winner === 'X' ? `${player1Name} wins!` : `${player2Name} wins!`;
    } else if (board.every(square => square !== null)) {
      return 'Draw';
    } else {
      return `Next Player: ${xIsNext ? player1Name : player2Name}`;
    }
  };

  const renderGame = () => {
    return (
      <div className="app">
        <h1>Tic-Tac-Toe</h1>
        <ScoreBoard 
          playerXScore={playerXScore} 
          playerOScore={playerOScore} 
          player1Name={player1Name}
          player2Name={player2Name}
        />
        <div className="board">{renderBoard()}</div>
        <div className="status">{renderStatus()}</div>
        {(calculateWinner(board) || board.every(square => square !== null)) && (
          <button onClick={resetGame}>Play Again</button>
        )}
      </div>
    );
  };

  return showMainMenu ? renderMainMenu() : renderGame();
}

export default App;
