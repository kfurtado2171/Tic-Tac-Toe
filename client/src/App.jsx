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
  const [playerName, setPlayerName] = useState('');

  const handleClick = (index) => {
    const newBoard = [...board];
    if (calculateWinner(newBoard, playerName) || newBoard[index]) {
      return;
    }
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    const winner = calculateWinner(newBoard, playerName);
    if (winner) {
      updateScores(winner);
    }
  };

  const calculateWinner = (squares, playerName) => {
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
        return squares[a] === 'X' ? playerName : 'Opponent';
      }
    }
    return null;
  };

  const updateScores = (winner) => {
    if (winner === playerName) {
      setPlayerXScore(prevScore => prevScore + 1);
    } else if (winner === 'Opponent') {
      setPlayerOScore(prevScore => prevScore + 1);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: playerName })
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Player created successfully:', data);
        // Handle success, e.g., show a success message
      } else {
        console.error('Failed to create player');
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Failed to create player:', error);
      // Handle error, e.g., show an error message
    }
  };
  
  const handleStartGame = async () => {
    // Save player's name to the database before starting the game
    await handleSubmit();
    setShowMainMenu(false);
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };
  

  const handleMainMenu = () => {
    setShowMainMenu(true);
    setPlayerName('');
    setPlayerXScore(0);
    setPlayerOScore(0);
  };

  const renderMainMenu = () => {
    return (
      <div className="main-menu">
        <h1 style={{ marginTop: '100px' }}>Welcome to Tic-Tac-Toe</h1>
        <div>
          <br />
          <label>Player Name:&nbsp;</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
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
    const winner = calculateWinner(board, playerName);
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every(square => square !== null)) {
      return 'Draw';
    } else {
      return `Next Player: ${playerName}`;
    }
  };

  const renderGame = () => {
    return (
      <div className="app">
        <h1>Tic-Tac-Toe</h1>
        <ScoreBoard playerXScore={playerXScore} playerOScore={playerOScore} playerName={playerName} />
        <div className="board">{renderBoard()}</div>
        <div className="status">{renderStatus()}</div> 
        {(calculateWinner(board, playerName) || board.every(square => square !== null)) && (
          <div className="game-over-buttons">
            <button className="play-again-button" onClick={resetGame}>Play Again</button>
            <button className="main-menu-button" onClick={handleMainMenu}>Main Menu</button>
          </div>
        )}
      </div>
    );
  };

  return showMainMenu ? renderMainMenu() : renderGame();
}

export default App;
