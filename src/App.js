import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

// The react-dom package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside the React model if you need to.

// createPortal(child, container) - Creates a portal. Portals provide a way to render children into a DOM node that exists outside the hierarchy of the DOM component.

// flushSync(callback) - Force React to flush any updates inside the provided callback synchronously. This ensures that the DOM is updated immediately.
// Force this state update to be synchronous.
// flushSync(() => {
//   setCount(count + 1);
// });
// By this point, DOM is updated.
// Note:
// - flushSync can significantly hurt performance. Use sparingly.
// - flushSync may force pending Suspense boundaries to show their fallback state.
// - flushSync may also run pending effects and synchronously apply any updates they contain before returning.
// - flushSync may also flush updates outside the callback when necessary to flush the updates inside the callback. For example, if there are pending updates from a click, React may flush those before flushing the updates inside the callback.

function App() {
  return (
    <div className="App">
      <CHome/>
      <FHome/>
    </div>
  );
}

export default App;
