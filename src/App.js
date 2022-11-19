import './App.css';
import CHome from './Components/CHome';

// In most cases, we recommend using controlled components to implement forms. In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.
// To write an uncontrolled component, instead of writing an event handler for every state update, you can use a ref to get form values from the DOM.

// Since an uncontrolled component keeps the source of truth in the DOM, it is sometimes easier to integrate React and non-React code when using uncontrolled components. It can also be slightly less code if you want to be quick and dirty. Otherwise, you should usually use controlled components.

// Since an uncontrolled component keeps the source of truth in the DOM, it is sometimes easier to integrate React and non-React code when using uncontrolled components. It can also be slightly less code if you want to be quick and dirty. Otherwise, you should usually use controlled components.

function App() {
  return (
    <div className="App">
      <CHome/>
    </div>
  );
}

export default App;
