import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

// Ref forwarding is a technique for automatically passing a ref through a component to one of its children.
// React forwardRef is a method that allows parent components pass down (i.e., “forward”) refs to their children. Using forwardRef in React gives the child component a reference to a DOM element created by its parent component.

function App() {
  return (
    <div className="App">
      <CHome/>
      <FHome />
    </div>
  );
}

export default App;
