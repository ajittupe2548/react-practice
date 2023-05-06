import { useState } from 'react';
import './App.css';
import CHome from './Components/CHome';

function App() {
  const [counter, setCounter] = useState(1);
  const [counter1, setCounter1] = useState(1);

  return (
    <div className="App">
      <button onClick={() => setCounter(counter + 1)}>Update counter</button>
      <button onClick={() => setCounter1(counter1 + 1)}>Update counter1</button>
      <CHome counter={counter} counter1={counter1} />
    </div>
  );
}

export default App;
