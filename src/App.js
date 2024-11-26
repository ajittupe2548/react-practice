import './App.css';
import React, { useEffect, useState, useId } from 'react';
import { flushSync } from "react-dom";

/* Batch update */
function BatchUpdate() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Click');
  console.log(`*****Rendered`);

  useEffect(() => {
    setTimeout(() => {
      console.log("Before update:", count, text);
      /* This batch update works in 18. Along with this promises batch update are also handled in react 18. */
      setCount(count + 1);
      flushSync(() => {
        setText("New Text");
      });
      console.log("After update:", count, text);
    }, 0);
  }, []);

  const handleClick = (e) => {
    /* This batch update works in 17 version also.  */
    setCount(count + 1);
    setText("New Text");
  }

  return <button onClick={handleClick}>{text}- {count}</button>;
}

/* useId */
function UseIdExample() {
  const [count, setCount] = useState(0);
  const id = useId();

  useEffect(() => {
    setTimeout(() => {
      setCount(1);
    }, 1000);
  }, []);

  return (
    <>
      {count}
      <label htmlFor={id}>Name</label>
      <input id={id} type="text" />
    </>
  );
}

const FlushSyncExample = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("Before update:", count);

    flushSync(() => {
      setCount((prev) => prev + 1);
    });

    console.log("After update:", count);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BatchUpdate />
      <UseIdExample />
      <UseIdExample />
      <FlushSyncExample />
    </div>
  );
}

export default App;
