import { useState, useEffect } from 'react';
import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

function App() {
  const [counter, setCounter] = useState(1);
  useEffect(() => {
    setInterval(() => {
      setCounter(counter => counter + 1);
    }, 2000);
  }, [])

  return (
    <div className="App">
      <CHome counter={counter} />
      {/* <FHome counter={counter} /> */}
    </div>
  );
}

export default App;
