import './App.css';
import CHome from './Components/CHome';

// React can be used in any web application. It can be embedded in other applications and, with a little care, other applications can be embedded in React.

// Integrating with DOM Manipulation Plugins - React is unaware of changes made to the DOM outside of React. It determines updates based on its own internal representation, and if the same DOM nodes are manipulated by another library, React gets confused and has no way to recover.

function App() {
  return (
    <div className="App">
      <CHome/>
    </div>
  );
}

export default App;
