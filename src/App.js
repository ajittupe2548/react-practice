import './App.css';
import React, { useEffect, useState, useId, Suspense, useTransition } from 'react';
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

/* Suspense */
const fetchData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve('Fetched Data'), 2000)
  );

const DataComponent = React.lazy(() => fetchData().then(() => ({ default: () => <div>Fetched Data</div> })));

function SuspenseExample() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DataComponent />
    </Suspense>
  );
}

/* startTransition */
function TransitionExample() {
  const [items, setItems] = useState([
    'Apple', 'Banana', 'Orange', 'Grape', 'Pineapple', 'Strawberry', 'Blueberry', 'Mango'
  ]);

  const [filter, setFilter] = useState('');
  const [isPending, startTransition] = useTransition();

  const filteredItems = items.filter(item => item.toLowerCase().includes(filter.toLowerCase()));

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;

    startTransition(() => {
      setFilter(newFilter);
    });
  };

  return (
    <div>
      <h1>Fruits List</h1>

      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter fruits"
      />

      {isPending ? <div>Loading...</div> : null}

      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      {/* <BatchUpdate /> */}
      {/* <UseIdExample />
      <UseIdExample /> */}
      {/* <SuspenseExample /> */}
      <TransitionExample />
    </div>
  );
}

export default App;
