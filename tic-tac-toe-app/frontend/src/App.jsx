import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ScoreBoard from './components/ScoreBoard';
import './App.css';
import './bootstrap.min.css';

const socket = io();

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playerXScore, setPlayerXScore] = useState(0);
  const [playerOScore, setPlayerOScore] = useState(0);
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  useEffect(() => {
    socket.on('move', (move) => {
      const { index, player } = move;
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setXIsNext((prev) => !prev);
      const winner = calculateWinner(newBoard, player1Name, player2Name);
      if (winner) {
        updateScores(winner);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [board, player1Name, player2Name]);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board, player1Name, player2Name)) {
      return;
    }
    const player = xIsNext ? 'X' : 'O';
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setXIsNext((prev) => !prev);
    socket.emit('move', { index, player });
    const winner = calculateWinner(newBoard, player1Name, player2Name);
    if (winner) {
      updateScores(winner);
    }
  };

  const calculateWinner = (squares, player1Name, player2Name) => {
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
        return squares[a] === 'X' ? player1Name : player2Name;
      }
    }
    return null;
  };

  const updateScores = (winner) => {
    if (winner === player1Name) {
      setPlayerXScore((prevScore) => prevScore + 1);
      recordScore(player1Id, player2Id, player1Id); // Assuming player1 always starts
    } else if (winner === player2Name) {
      setPlayerOScore((prevScore) => prevScore + 1);
      recordScore(player1Id, player2Id, player2Id);
    }
  };
  
  const recordScore = (playerId1, playerId2, winnerId) => {
    fetch('/api/players/add-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerId: playerId1, winnerId }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error('Error recording score:', err));
  };  

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const handleStartGame = () => {
    setShowMainMenu(false);
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const handleMainMenu = () => {
    setShowMainMenu(true);
    setPlayer1Name('');
    setPlayer2Name('');
    setPlayerXScore(0);
    setPlayerOScore(0);
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
    const winner = calculateWinner(board, player1Name, player2Name);
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every((square) => square !== null)) {
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
        {(calculateWinner(board, player1Name, player2Name) || board.every((square) => square !== null)) && (
          <div className="game-over-buttons">
            <button className="play-again-button" onClick={resetGame}>
              Play Again
            </button>
            <button className="main-menu-button" onClick={handleMainMenu}>
              Main Menu
            </button>
          </div>
        )}
      </div>
    );
  };

  return showMainMenu ? renderMainMenu() : renderGame();
}

export default App;
