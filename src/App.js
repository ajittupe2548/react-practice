import { useState, useEffect } from 'react';
import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

// Lifecycle of Components - Each component in React has a lifecycle which you can monitor and manipulate during its three main phases.

// Mounting : Mounting means putting elements into the DOM.
// constructor() -  when the component is initiated, and it is the natural place to set up the initial state and other initial values.
// getDerivedStateFromProps() - method is called right before rendering the element(s) in the DOM.
// render() - method that actually outputs the HTML to the DOM.
// componentDidMount() - called after the component is rendered.

// Updating - The next phase in the lifecycle is when a component is updated. A component is updated whenever there is a change in the component's state or props.
// getDerivedStateFromProps() - first method that is called when a component gets updated.
// shouldComponentUpdate() - you can return a Boolean value that specifies whether React should continue with the rendering or not. Default value is true.
// render() - re-render the HTML to the DOM, with the new changes.
// getSnapshotBeforeUpdate() - In this method you have access to the props and state before the update, meaning that even after the update, you can check what the values were before the update.
// componentDidUpdate() - Called after the component is updated in the DOM.

// Unmounting - The next phase in the lifecycle is when a component is removed from the DOM, or unmounting as React likes to call it.
// componentWillUnmount() - called when the component is about to be removed from the DOM.


function App() {
  const [counter, setCounter] = useState(1);
  useEffect(() => {
    setInterval(() => {
      setCounter(counter => counter + 1);
    }, 2000);
  }, [])

  return (
    <div className="App">
      <CHome counter={counter} />
      {/* <FHome counter={counter} /> */}
    </div>
  );
}

export default App;
