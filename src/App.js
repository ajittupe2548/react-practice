import './App.css';
import CHome from './Components/CHome';

// The term “render prop” refers to a technique for sharing code between React components using a prop whose value is a function.
// A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

// Using Props Other Than render - It’s important to remember that just because the pattern is called “render props” you don’t have to use a prop named render to use this pattern. In fact, any prop that is a function that a component uses to know what to render is technically a “render prop”.

// Be careful when using Render Props with React.PureComponent - Using a render prop can negate the advantage that comes from using React.PureComponent if you create the function inside a render method. This is because the shallow prop comparison will always return false for new props, and each render in this case will generate a new value for the render prop.

function App() {
  return (
    <div className="App">
      <CHome/>
    </div>
  );
}

export default App;
