import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

// The ReactDOMServer object enables you to render components to static markup. Typically, it’s used on a Node server.
// For more info : https://reactjs.org/docs/react-dom-server.html

function App() {
  return (
    <div className="App">
      <CHome/>
      <FHome/>
    </div>
  );
}

export default App;
