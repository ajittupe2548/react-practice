import './App.css';
import React, { useMemo, useState } from 'react';

function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const result1 = useMemo(() => {
    console.log('Calculating result1...');
    return count1 * 2;
  }, [count1]);

  const result2 = useMemo(() => {
    console.log('Calculating result2...');
    return count2 * 2;
  }, [count2]);

  return (
    <div className="App">
      <button onClick={() => setCount1(prev => prev + 1)}>Increment1 - {result1}</button>
      <button onClick={() => setCount1(prev => prev - 1)}>Decrement1 - {result1}</button>
      <button onClick={() => setCount2(prev => prev + 1)}>Increment2 - {result2}</button>
      <button onClick={() => setCount2(prev => prev - 1)}>Decrement2 - {result2}</button>
      <div>Result1: {result1}</div>
      <div>Result2: {result2}</div>
    </div>
  );
}

export default App;
