import { useEffect, useRef, useState } from "react";
import "./App.css";

const getInitialIntervalId = () => {
  console.log(
    `*****Output is :  => getInitialIntervalId => getInitialIntervalId:`
  );
  return null;
};

const getInputElemDefaultValue = () => {
  console.log(`*****Output is :  => getInputElemDefaultValue => getInputElemDefaultValue:`);
  return null;
};

function App() {
  const [count, setCount] = useState(0);
  const intervalIdRef = useRef(null);
  const inputElRef = useRef(getInputElemDefaultValue());

  if (intervalIdRef.current === null) {
    intervalIdRef.current = getInitialIntervalId();
  }

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  }, []);

  return (
    <div className="App">
      <input type="text" ref={inputElRef} />
      <button onClick={() => inputElRef.current.focus()}>
        Focus the input
      </button>
      <div />
      {count}{" "}
      <button onClick={() => clearInterval(intervalIdRef.current)}>
        Close
      </button>
    </div>
  );
}

export default App;
