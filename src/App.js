import './App.css';
import DataFlow from './components/DataFlow';
import Render from './components/Render';
import SingleTon from './components/SingleTon';
import LocalState from './components/LocalState';

/*
Writing Resilient Components: https://overreacted.io/writing-resilient-components/
*/

function App() {
  return (
    <div className="App">
      {/* <DataFlow /> */}
      {/* <Render /> */}
      {/* <SingleTon /> */}
      <LocalState />
    </div>
  );
}

export default App;
