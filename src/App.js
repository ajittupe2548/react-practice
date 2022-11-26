import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

// JavaScript Environment Requirements - React 18 supports all modern browsers (Edge, Firefox, Chrome, Safari, etc).
// If you support older browsers and devices such as Internet Explorer which do not provide modern browser features natively or have non-compliant implementations, consider including a global polyfill in your bundled application.

// Here is a list of the modern features React 18 uses:
// - Promise
// - Symbol
// - Object.assign
// The correct polyfill for these features depend on your environment. For many users, you can configure your Browserlist settings. For others, you may need to import polyfills like core-js directly.

function App() {
  return (
    <div className="App">
      <CHome/>
      <FHome/>
    </div>
  );
}

export default App;
