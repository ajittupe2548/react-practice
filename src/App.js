import { useEffect, useRef, useState } from "react";
import "./App.css";

/* Although the result of these functions is only used for the initial render, these functions will run on every render. */
const getInitialIntervalId = () => {
  console.log(
    `*****Output is :  => getInitialIntervalId => getInitialIntervalId:`
  );
  return 0;
};

const getInitialCount = () => {
  // let initialDate = new Date();
  // while (new Date().getSeconds() - initialDate.getSeconds() < 1) {}
  console.log(`*****Output is :  => getInitialCount => getInitialCount:`);
  return 0;
};

function App() {
  const [count, setCount] = useState(getInitialCount());
  const intervalIdRef = useRef(null);
  const inputElRef = useRef(null);

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
