import './App.css';
import React, { useMemo, useState, useEffect, useCallback, memo } from 'react';

const MemoExample = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const result1 = useMemo(() => {
    console.log('Memo calculating result1...');
    return count1 * 2;
  }, [count1]);

  const result2 = useMemo(() => {
    console.log('Memo calculating result2...');
    return count2 * 2;
  }, [count2]);

  return (
    <>
      <h2>Memo Example</h2>
      <button onClick={() => setCount1((prev) => prev + 1)}>
        Increment1 - {result1}
      </button>
      <button onClick={() => setCount1((prev) => prev - 1)}>
        Decrement1 - {result1}
      </button>
      <button onClick={() => setCount2((prev) => prev + 1)}>
        Increment2 - {result2}
      </button>
      <button onClick={() => setCount2((prev) => prev - 1)}>
        Decrement2 - {result2}
      </button>
      <div>Result1: {result1}</div>
      <div>Result2: {result2}</div>
    </>
  );
};

const Child = memo(({ onClick }) => {
  console.log(`*****Output is :  => Child => Child:`);

  return <div onClick={onClick}>Child</div>;
});

const CallbackExample = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
  }, [])

  // const handleChildClick = () => {  /* On every render, this function will be re-created, and the child component will receive a new prop value. As a result, it will also re-render, even if the actual prop has not changed. */
  //   console.log('Clicked!');
  // };

  const handleChildClick = useCallback(() => {  /* useCallback memoizes the function and re-creates it only if the dependency values change. */
    console.log('Clicked!');
  }, []);

  return (
    <>
      <h2>Callback Example</h2>
      <p>Count: {count}</p>
      <Child onClick={handleChildClick} />
    </>
  );
};

function App() {
  return (
    <div className='App'>
      <MemoExample />
      <CallbackExample />
    </div>
  );
}

export default App;
