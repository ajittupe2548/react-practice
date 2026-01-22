import { useState } from 'react';
import './App.css';

function App() {
  // Game configuration
  const WINNING_POSITION = 100;
  
  // Snakes: from -> to (head -> tail)
  const SNAKES = {
    98: 28,
    95: 24,
    92: 51,
    83: 19,
    73: 1,
    69: 33,
    64: 36,
    59: 17,
    52: 29,
    50: 9,
    47: 16,
    37: 3
  };
  
  // Ladders: from -> to (bottom -> top)
  const LADDERS = {
    4: 56,
    12: 50,
    14: 55,
    22: 58,
    41: 79,
    54: 88,
    63: 80,
    70: 90,
    80: 99
  };
  
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', position: 0, color: '#FF6B6B' },
    { id: 2, name: 'Player 2', position: 0, color: '#4ECDC4' }
  ]);
  
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [diceValue, setDiceValue] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [gameStatus, setGameStatus] = useState('playing'); // playing, won
  const [message, setMessage] = useState('Roll the dice to start!');
  const [winner, setWinner] = useState(null);
  
  const rollDice = () => {
    if (isRolling || gameStatus === 'won') return;
    
    setIsRolling(true);
    setMessage('Rolling...');
    
    // Animate dice roll
    let count = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      count++;
      
      if (count > 10) {
        clearInterval(interval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalValue);
        movePlayer(finalValue);
      }
    }, 100);
  };
  
  const movePlayer = (steps) => {
    const currentPlayer = players[currentPlayerIndex];
    let newPosition = currentPlayer.position + steps;
    
    // Check if move exceeds board
    if (newPosition > WINNING_POSITION) {
      setMessage(`${currentPlayer.name} needs exact roll to win!`);
      setIsRolling(false);
      nextTurn();
      return;
    }
    
    // Move player
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].position = newPosition;
    setPlayers(updatedPlayers);
    
    setTimeout(() => {
      checkSnakesAndLadders(newPosition);
    }, 500);
  };
  
  const checkSnakesAndLadders = (position) => {
    const currentPlayer = players[currentPlayerIndex];
    let finalPosition = position;
    let messageText = '';
    
    // Check for snake
    if (SNAKES[position]) {
      finalPosition = SNAKES[position];
      messageText = `🐍 Snake bite! ${currentPlayer.name} slides down to ${finalPosition}`;
      
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex].position = finalPosition;
      
      setTimeout(() => {
        setPlayers(updatedPlayers);
        setMessage(messageText);
      }, 300);
    }
    // Check for ladder
    else if (LADDERS[position]) {
      finalPosition = LADDERS[position];
      messageText = `🪜 Ladder! ${currentPlayer.name} climbs up to ${finalPosition}`;
      
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex].position = finalPosition;
      
      setTimeout(() => {
        setPlayers(updatedPlayers);
        setMessage(messageText);
      }, 300);
    } else {
      messageText = `${currentPlayer.name} moved to ${position}`;
      setMessage(messageText);
    }
    
    // Check win condition
    setTimeout(() => {
      if (finalPosition === WINNING_POSITION) {
        setGameStatus('won');
        setWinner(currentPlayer);
        setMessage(`🎉 ${currentPlayer.name} wins the game!`);
        setIsRolling(false);
      } else {
        setIsRolling(false);
        nextTurn();
      }
    }, messageText.includes('🐍') || messageText.includes('🪜') ? 1500 : 800);
  };
  
  const nextTurn = () => {
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  };
  
  const resetGame = () => {
    setPlayers(players.map(player => ({ ...player, position: 0 })));
    setCurrentPlayerIndex(0);
    setDiceValue(null);
    setGameStatus('playing');
    setWinner(null);
    setMessage('Roll the dice to start!');
    setIsRolling(false);
  };
  
  const renderBoard = () => {
    const cells = [];
    
    // Create board from 100 to 1 (snake ladder style)
    for (let row = 0; row < 10; row++) {
      const rowCells = [];
      for (let col = 0; col < 10; col++) {
        let cellNumber;
        
        // Alternate row direction (zigzag pattern)
        if (row % 2 === 0) {
          cellNumber = 100 - (row * 10 + col);
        } else {
          cellNumber = 100 - (row * 10 + (9 - col));
        }
        
        const playersOnCell = players.filter(p => p.position === cellNumber);
        const hasSnake = SNAKES[cellNumber];
        const hasLadder = LADDERS[cellNumber];
        
        rowCells.push(
          <div
            key={cellNumber}
            className={`cell ${hasSnake ? 'snake-cell' : ''} ${hasLadder ? 'ladder-cell' : ''} ${cellNumber === 100 ? 'winning-cell' : ''}`}
          >
            <span className="cell-number">{cellNumber}</span>
            {hasSnake && <span className="snake-emoji">🐍→{hasSnake}</span>}
            {hasLadder && <span className="ladder-emoji">🪜→{hasLadder}</span>}
            <div className="players-container">
              {playersOnCell.map(player => (
                <div
                  key={player.id}
                  className="player-token"
                  style={{ backgroundColor: player.color }}
                  title={player.name}
                >
                  {player.id}
                </div>
              ))}
            </div>
          </div>
        );
      }
      cells.push(
        <div key={row} className="board-row">
          {rowCells}
        </div>
      );
    }
    
    return cells;
  };
  
  return (
    <div className="App">
      <div className="game-container">
        <h1 className="game-title">🐍 Snakes & Ladders 🪜</h1>
        
        <div className="game-info">
          <div className="players-info">
            {players.map((player, index) => (
              <div
                key={player.id}
                className={`player-card ${index === currentPlayerIndex && gameStatus === 'playing' ? 'active' : ''}`}
                style={{ borderColor: player.color }}
              >
                <div className="player-token-large" style={{ backgroundColor: player.color }}>
                  {player.id}
                </div>
                <div className="player-details">
                  <div className="player-name">{player.name}</div>
                  <div className="player-position">Position: {player.position}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="dice-section">
            <div className={`dice ${isRolling ? 'rolling' : ''}`}>
              {diceValue || '?'}
            </div>
            <button
              className="roll-button"
              onClick={rollDice}
              disabled={isRolling || gameStatus === 'won'}
            >
              {isRolling ? 'Rolling...' : 'Roll Dice'}
            </button>
          </div>
        </div>
        
        <div className="message-bar" style={{ 
          backgroundColor: gameStatus === 'won' ? '#FFD93D' : '#e8f4f8' 
        }}>
          {message}
        </div>
        
        <div className="board">
          {renderBoard()}
        </div>
        
        {gameStatus === 'won' && (
          <div className="winner-overlay">
            <div className="winner-card">
              <h2>🎉 Game Over! 🎉</h2>
              <div className="winner-token" style={{ backgroundColor: winner.color }}>
                {winner.id}
              </div>
              <h3>{winner.name} Wins!</h3>
              <button className="play-again-button" onClick={resetGame}>
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
