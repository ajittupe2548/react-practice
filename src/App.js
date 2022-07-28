import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

// Forms - HTML form elements work a bit differently from other DOM elements in React, because form elements naturally keep some internal state.

// Controlled Components - In HTML, form elements such as <input>, <textarea>, and <select> typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with setState().

// Alternatives to Controlled Components - It can sometimes be tedious to use controlled components, because you need to write an event handler for every way your data can change and pipe all of the input state through a React component. This can become particularly annoying when you are converting a preexisting codebase to React, or integrating a React application with a non-React library. In these situations, you might want to check out uncontrolled components(https://reactjs.org/docs/uncontrolled-components.html), an alternative technique for implementing input forms.

function App() {
  return (
    <div className="App">
      <CHome/>
    </div>
  );
}

export default App;
