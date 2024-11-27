import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const intervalId = useRef(null);

  useEffect(() => {
    console.log(`*****Output is :  => useEffect => useEffect-1`);
    intervalId.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId.current);
    };
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
    console.log(`*****Output is :  => useEffect => useEffect-2`);
    memoizedFetchData();
    // }, [fetchData, someObject]);  /* This can cause the effect to re-run more often than necessary, especially if fetchData and someObject are re-created on every render. */
  }, [
    memoizedFetchData,
    memoizeSomeObject,
  ]); /* To fix re-rendering issue, we need to wrap function in useCallback and object in useMemo, this ensures that object and function is not created on new render. */

  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);
  const targetRef = useRef(null);

  // useEffect(() => { /* This might cause a flicker because the browser might paint the screen first and then run the effect to position the tooltip */
  useLayoutEffect(() => {
    /* Runs synchronously after all DOM mutations but before the browser has a chance to paint. */

    /* This will block paint with useLayoutEffect */
    // let cur = Date.now();
    // while (Date.now() - cur < 3000) { }
    console.log(`*****Output is :  => useEffect => useEffect-3`);

    const target = targetRef.current;
    const tooltip = tooltipRef.current;
    if (target && tooltip) {
      const targetRect = target.getBoundingClientRect();
      setPosition({
        top: targetRect.bottom,
        left: targetRect.left,
      });
    }
  }, []);

  const [showAlert, setShowAlert] = useState(false);
  const [bgColor, setBgColor] = useState('#fff');

  useEffect(() => {
    console.log(`*****Output is :  => useEffect => useEffect-4`);
    if (showAlert) {
      // alert('Button was clicked!');  /* This might block the paint because the alert function is called synchronously within the effect. */
      setTimeout(() => {
        /* This ensures the browser paints the updated screen before showing the alert. */
        alert('Button was clicked!');
      }, 0);
    }
  }, [showAlert]);

  const handleClick = () => {
    setBgColor(
      `rgb(${Math.random() * 256},${Math.random() * 256},${Math.random() * 256
      })`
    );
    setShowAlert(!showAlert);
  };

  return (
    <div className='App' style={{ backgroundColor: bgColor, height: '50vh' }}>
      <div>Rendered {count} times.</div>
      <button ref={targetRef}>Hover over me</button>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          background: 'lightgrey',
        }}
      >
        Tooltip
      </div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default App;
