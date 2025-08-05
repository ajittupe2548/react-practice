import { useState, useEffect } from 'react';
import './App.css';

const initialData = [
    {
        name: "react",
        img:
            "https://media.geeksforgeeks.org/wp-content/uploads/20230927165802/atom-4.png",
    },
    {
        name: "java",
        img:
            "https://media.geeksforgeeks.org/wp-content/uploads/20230927165803/java.png",
    },
    {
        name: "css",
        img:
            "https://media.geeksforgeeks.org/wp-content/uploads/20230927165803/css-3-1.png",
    },
    {
        name: "node",
        img:
            "https://media.geeksforgeeks.org/wp-content/uploads/20230927165805/nodejs-1.png",
    },
    {
        name: "html",
        img:
            "https://media.geeksforgeeks.org/wp-content/uploads/20230927165806/html-5-1.png",
    },
    {
        name: "js",
        img:
            "https://media.geeksforgeeks.org/wp-content/uploads/20230927165804/js-3.png",
    }
];

// Utility to shuffle array
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function createTiles(data, count) {
    const tiles = [];
    for (let i = 0; i < count; i++) {
        tiles.push({
            ...data[i % data.length],
            id: i,
            isFlipped: false,
            isMatched: false,
        });
    }
    return shuffle([...tiles, ...tiles]);
}

const MemoryGame = ({ data, count }) => {
    const [tiles, setTiles] = useState(() => createTiles(data, count));
    const [flipped, setFlipped] = useState([]);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        if (flipped.length === 2) {
            const [firstIdx, secondIdx] = flipped;
            const firstTile = tiles[firstIdx];
            const secondTile = tiles[secondIdx];

            if (firstTile.name === secondTile.name) {
                setTimeout(() => {
                    setTiles(prev =>
                        prev.map((tile, idx) =>
                            idx === firstIdx || idx === secondIdx
                                ? { ...tile, isMatched: true }
                                : tile
                        )
                    );
                    setFlipped([]);
                }, 700);
            } else {
                setTimeout(() => {
                    setTiles(prev =>
                        prev.map((tile, idx) =>
                            idx === firstIdx || idx === secondIdx
                                ? { ...tile, isFlipped: false }
                                : tile
                        )
                    );
                    setFlipped([]);
                }, 700);
            }
            setMoves(m => m + 1);
        }
    }, [flipped, tiles]);

    const handleClick = (index) => {
        if (
            tiles[index].isFlipped ||
            tiles[index].isMatched ||
            flipped.length === 2
        ) {
            return;
        }
        setTiles(prev =>
            prev.map((tile, idx) =>
                idx === index ? { ...tile, isFlipped: true } : tile
            )
        );
        setFlipped(f => [...f, index]);
    };

    const handleRestart = () => {
        setTiles(createTiles(data, count));
        setFlipped([]);
        setMoves(0);
    };

    return (
        <div>
            <h2>Memory Game</h2>
            <button onClick={handleRestart}>Restart</button>
            <div className="container">
                {tiles.map((item, index) => (
                    <div
                        className={`item${item.isFlipped || item.isMatched ? ' flipped' : ''}`}
                        data-name={item.name}
                        key={item.id + '-' + index}
                        onClick={() => handleClick(index)}
                    >
                        <img className='img' src={item.img} alt={item.name} />
                        <div className='overlay'></div>
                    </div>
                ))}
            </div>
            <div>Moves: {moves}</div>
        </div>
    );
};

function App() {
    return (
        <div className="App">
            <MemoryGame data={initialData} count={6} />
        </div>
    );
}

export default App;
