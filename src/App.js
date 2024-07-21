import './App.css';
import React, { useState, useEffect } from "react";
/* https://github.com/ajittupe2548/learning-docs/blob/master/React/Hooks.md#usestate */

const BatchStateUpdate = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(renderCount + 1);
  }, [counter1, counter2, counter3]);

  const handleClick = () => {
    setCounter1(counter1 + 1);
    setCounter2(counter2 + 1);
    setCounter3(counter3 + 1);
  }

  return (
    <div className='App'>
      <h1>Function Component</h1>
      <div>
        Counter1: {counter1}
      </div>
      <div>
        Counter2: {counter2}
      </div>
      <div>
        Counter3: {counter3}
      </div>
      <br />
      <div>Component was rendered {renderCount} times</div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );

}

/* In React 17, async operations were not batched by React. But in React version 18, async operations are also batched. */
const AsyncEventHandlers = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(renderCount + 1);
  }, [counter1, counter2, counter3]);

  const handleClickAsync = async () => {
    await setCounter1(counter1 + 1);
    setCounter2(counter2 + 1);
    setCounter3(counter3 + 1);
  }

  const handleClickThen = () => {
    Promise.resolve().then(res => {
      setCounter1(counter1 + 1);
      setCounter2(counter2 + 1);
      setCounter3(counter3 + 1);
    });
  }

  return (
    <div className='App'>
      <h1>Function Component</h1>
      <div>
        Counter1: {counter1}
      </div>
      <div>
        Counter2: {counter2}
      </div>
      <div>
        Counter3: {counter3}
      </div>
      <br />
      <div>Component was rendered {renderCount} times</div>
      <button onClick={handleClickAsync}>Async handler</button>
      <button onClick={handleClickThen}>Then handler</button>
    </div>
  );
}

function App() {
  return (
    <>
      <BatchStateUpdate />
      <AsyncEventHandlers />
    </>
  )
}

export default App;
