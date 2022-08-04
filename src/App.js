import './App.css';
import CHome from './Components/CHome';

// So What About Inheritance?
// At Facebook, we use React in thousands of components, and we haven’t found any use cases where we would recommend creating component inheritance hierarchies.
// Props and composition give you all the flexibility you need to customize a component’s look and behavior in an explicit and safe way.

function App() {
  return (
    <div className="App">
      <CHome/>
    </div>
  );
}

export default App;
