import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';
import Profiler from 'react'

function App() {
  const callback = () => {
    console.log("ajit")
  }
  return (
    <div className="App">
      <Profiler id="CHome" onRender={callback}>
      <CHome/>
      </Profiler>
      <FHome/>
    </div>
  );
}

export default App;
