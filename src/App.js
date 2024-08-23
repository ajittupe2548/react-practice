import './App.css';
import DataFlow from './components/DataFlow';
import Render from './components/Render';

/*
Writing Resilient Components: https://overreacted.io/writing-resilient-components/
*/

function App() {
  return (
    <div className="App">
      {/* <DataFlow /> */}
      <Render />
    </div>
  );
}

export default App;
