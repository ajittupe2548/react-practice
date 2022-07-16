import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

// Conditional rendering - Conditional rendering in React works the same way conditions work in JavaScript.

// 1) Element Variables - You can use variables to store elements. This can help you conditionally render a part of the component while the rest of the output doesn’t change.

// 2) Inline If with Logical && Operator - You may embed expressions in JSX by wrapping them in curly braces. This includes the JavaScript logical && operator.

// 3) Inline If-Else with Conditional Operator - Another method for conditionally rendering elements inline is to use the JavaScript conditional operator condition ? true : false.

function App() {
  return (
    <div className="App">
      <CHome/>
    </div>
  );
}

export default App;
