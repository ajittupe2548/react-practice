import './App.css';
import CHome from './Components/CHome';

// Overview - React lets you define components as classes or functions. The only method you must define in a React.Component subclass is called render(). All the other methods described on this page are optional.

// The Component Lifecycle - Each component has several “lifecycle methods” that you can override to run code at particular times in the process. You can use this lifecycle diagram as a cheat sheet(https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/).

function App() {
  return (
    <div className="App">
      <CHome/>
    </div>
  );
}

export default App;
