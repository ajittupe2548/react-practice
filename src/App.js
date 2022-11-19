import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

// Static type checkers like Flow and TypeScript identify certain types of problems before you even run your code. They can also improve developer workflow by adding features like auto-completion. For this reason, we recommend using Flow or TypeScript instead of PropTypes for larger code bases.

// Flow - Flow is a static type checker for your JavaScript code. It is developed at Facebook and is often used with React. It lets you annotate the variables, functions, and React components with a special type syntax, and catch mistakes early. You can read an introduction to Flow to learn its basics.
// To use Flow, you need to:
// - Add Flow to your project as a dependency.
// - Ensure that Flow syntax is stripped from the compiled code.
// - Add type annotations and run Flow to check them.

function App() {
  return (
    <div className="App">
      <CHome/>
      <FHome/>
    </div>
  );
}

export default App;
