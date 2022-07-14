import './App.css';
import C_Home from './Components/c_home';
import F_Home from './Components/f_home';

// Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.
// Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

// Note: Always start component names with a capital letter.

// Props are Read-Only - Whether you declare a component as a function or a class, it must never modify its own props.


function App() {
  return (
    <div className="App">
      <C_Home name="SpiderMan"/>
      <F_Home name="BatMan"/>
    </div>
  );
}

export default App;
