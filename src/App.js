import { useState } from 'react';
import './App.css';
import CHome from './Components/CHome';

function App() {
  const [counter, setCounter] = useState(1);

  return (
    <div className="App">
      <button onClick={() => setCounter(counter + 1)}>Update counter</button>
      <CHome counter={counter} />
    </div>
  );
}

export default App;
