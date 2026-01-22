import { useState } from 'react';
import './App.css';

function App() {
  const [selectedNumber, setSelectedNumber] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [attempts, setAttempts] = useState(3);
  const [message, setMessage] = useState('');
  const [winningTile, setWinningTile] = useState(null);
  const [revealedTiles, setRevealedTiles] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    if (!selectedNumber || selectedNumber < 1 || selectedNumber > 9) {
      alert('Please select a number between 1 and 9');
      return;
    }
    setGameStarted(true);
    setAttempts(3);
    setMessage('');
    setWinningTile(Math.floor(Math.random() * 9));
    setRevealedTiles([]);
    setGameOver(false);
  };

  const handleTileClick = (index) => {
    if (gameOver || revealedTiles.includes(index)) return;

    setRevealedTiles([...revealedTiles, index]);

    if (index === winningTile) {
      setMessage(`🎉 Congratulations! You found ${selectedNumber}! You Win!`);
      setGameOver(true);
    } else {
      const remainingAttempts = attempts - 1;
      setAttempts(remainingAttempts);
      
      if (remainingAttempts === 0) {
        setMessage(`😞 Game Over! You failed. The number was in tile ${winningTile + 1}`);
        setGameOver(true);
      } else {
        setMessage(`Wrong tile! ${remainingAttempts} attempts remaining`);
      }
    }
  };

  const resetGame = () => {
    setSelectedNumber('');
    setGameStarted(false);
    setAttempts(3);
    setMessage('');
    setWinningTile(null);
    setRevealedTiles([]);
    setGameOver(false);
  };

  return (
    <div className="App">
      <h1>9-Tile Number Game</h1>
      
      {!gameStarted ? (
        <div className="start-screen">
          <p>Select a number (1-9) and find it in the tiles!</p>
          <input
            type="number"
            min="1"
            max="9"
            value={selectedNumber}
            onChange={(e) => setSelectedNumber(e.target.value)}
            placeholder="Enter number 1-9"
          />
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <div className="game-screen">
          <div className="game-info">
            <p>Your number: <strong>{selectedNumber}</strong></p>
            <p>Attempts remaining: <strong>{attempts}</strong></p>
          </div>

          <div className="tiles-grid">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className={`tile ${revealedTiles.includes(index) ? 'revealed' : ''} ${
                  gameOver && index === winningTile ? 'winning' : ''
                }`}
                onClick={() => handleTileClick(index)}
              >
                {revealedTiles.includes(index) || gameOver
                  ? index === winningTile
                    ? selectedNumber
                    : '❌'
                  : '?'}
              </div>
            ))}
          </div>

          {message && <div className={`message ${gameOver ? 'game-over' : ''}`}>{message}</div>}

          {gameOver && <button onClick={resetGame}>Play Again</button>}
        </div>
      )}
    </div>
  );
}

export default App;
