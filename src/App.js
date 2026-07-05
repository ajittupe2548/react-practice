import { useEffect, useRef, useState } from 'react';
import './App.css';

const GRID_SIZE = 3;

function Grid() {
  const [clickedIndex, setClickedIndex] = useState([]);
  const timerRef = useRef(null);

  const clearTiles = () => {
    if (clickedIndex.length === 0) return;

    timerRef.current = setInterval(() => {
      setClickedIndex(prev => {
        const newClicked = prev.slice(0, -1);
        return newClicked;
      })
    }, 1000);
  }

  useEffect(() => {
    if (clickedIndex.length === 0) {
      clearInterval(timerRef.current);
    }

    if (clickedIndex.length === GRID_SIZE * GRID_SIZE) {
      clearTiles();
    }
  }, [clickedIndex]);

  const handleTileclick = (index) => {
    if (clickedIndex.includes(index)) return;

    const newClicked = [...clickedIndex, index];
    setClickedIndex(newClicked);
  }

  return (
    <div className="app" style={{ gridTemplateColumns: GRID_SIZE }}>
      {
        Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => index).map((item, index) => {
          return (
            <div key={index} className='child' style={{ background: clickedIndex.includes(index) ? 'green' : null }} onClick={() => handleTileclick(index)}>
              {item + 1}
            </div>
          )
        })
      }
    </div>
  );
}

const DELAY = 500;

const debounce = (callback, delay) => {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  }
}

const AutoSave = () => {
  const inputRef = useRef(null);

  const handleInput = (e) => {
    console.log('input', e.target.value);
  }

  const deboucedFunc = debounce(handleInput, DELAY);

  useEffect(() => {
    inputRef?.current.addEventListener('input', deboucedFunc);

    return () => {
      inputRef?.current.removeEventListener('input', deboucedFunc);
    }
  }, []);

  return (
    <>
      <input type='text' ref={inputRef} />
    </>
  )
}

function App() {
  return (
    <AutoSave />
  )
}

export default App
