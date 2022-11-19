import './App.css';
import CHome from './Components/CHome';

// StrictMode is a tool for highlighting potential problems in an application. Like Fragment, StrictMode does not render any visible UI. It activates additional checks and warnings for its descendants.
// Note: Strict mode checks are run in development mode only; they do not impact the production build.

// StrictMode currently helps with:
// Identifying components with unsafe lifecycles
// Warning about legacy string ref API usage
// Warning about deprecated findDOMNode usage
// Detecting unexpected side effects
// Detecting legacy context API
// Ensuring reusable state

function App() {
  return (
    <div className="App">
      <CHome/>
    </div>
  );
}

export default App;
