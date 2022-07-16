import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

// Handling Events - Handling events with React elements is very similar to handling events on DOM elements
// - React events are named using camelCase, rather than lowercase.
// - With JSX you pass a function as the event handler, rather than a string.

// HTML
// <button onclick="activateLasers()">
//   Activate Lasers
// </button>

// React
// <button onClick={activateLasers}>
//   Activate Lasers
// </button>

function App() {
  return (
    <div className="App">
      <CHome/>
    </div>
  );
}

export default App;
