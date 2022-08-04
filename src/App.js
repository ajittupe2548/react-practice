import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

// Lifting State Up - Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor.

// There should be a single “source of truth” for any data that changes in a React application. Usually, the state is first added to the component that needs it for rendering. Then, if other components also need it, you can lift it up to their closest common ancestor. Instead of trying to sync the state between different components, you should rely on the top-down data flow.

function App() {
  return (
    <div className="App">
      <CHome/>
    </div>
  );
}

export default App;
