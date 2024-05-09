// Import the CSS file for styling
import './TicTacToe.css';

// Define a functional component called TicTacToe
function TicTacToe() {
  // State to manage the tic-tac-toe board
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

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

  // Function to render the game board
  const renderBoard = () => {
    return board.map((square, index) => (
      <button key={index} className="square" onClick={() => handleClick(index)}>
        {square}
      </button>
    ));
  };

  // Render the TicTacToe component
  return (
    <div className="tic-tac-toe"> {/* Tic-tac-toe container */}
      <h1>Tic-Tac-Toe</h1> {/* Game title */}
      <div className="board">{renderBoard()}</div> {/* Render the game board */}
      <div className="status"> {/* Display game status */}
        {calculateWinner(board) ? `Winner: ${calculateWinner(board)}` : `Next Player: ${xIsNext ? 'X' : 'O'}`}
      </div>
    </div>
  );
}

// Export the TicTacToe component as default
export default TicTacToe;
