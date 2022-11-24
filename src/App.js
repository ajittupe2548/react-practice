import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

// SyntheticEvent - This reference guide documents the SyntheticEvent wrapper that forms part of React’s Event System.
// More info - https://reactjs.org/docs/events.html

function App() {
  return (
    <div className="App">
      <CHome/>
      <FHome/>
    </div>
  );
}

export default App;
