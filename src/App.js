import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const intervalId = useRef(null);

  useEffect(() => {
    console.log(`*****Output is :  => useEffect => useEffect-1`)
    intervalId.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId.current);
    }
  }, []);

  const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const result = await response.json();
    setData(result);
  };

  const someObject = { key: 'value' };

  const memoizedFetchData = useCallback(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const result = await response.json();
    setData(result);
  }, []);

  const memoizeSomeObject = useMemo(() => ({ key: 'value' }), []);

  useEffect(() => {
    console.log(`*****Output is :  => useEffect => useEffect-2`)
    fetchData();
  // }, [fetchData, someObject]);  /* This can cause the effect to re-run more often than necessary, especially if fetchData and someObject are re-created on every render. */
  }, [memoizedFetchData, memoizeSomeObject]);  /* To fix re-rendering issue, we need to wrap function in useCallback and object in useMemo, this ensures that object and function is not created on new render. */

  return (
    <div className="App">
      Rendered {count} times.
    </div>
  );
}

export default App;
