import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

// Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
// ReactDOM.createPortal(child, container)
// The first argument (child) is any renderable React child, such as an element, string, or fragment. The second argument (container) is a DOM element.

// Note:
// When working with portals, remember that managing keyboard focus becomes very important.
// For modal dialogs, ensure that everyone can interact with them by following the WAI-ARIA Modal Authoring Practices.

function App() {
  return (
    <div className="App">
      <CHome/>
    </div>
  );
}

export default App;
