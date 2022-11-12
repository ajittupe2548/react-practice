import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

// Refs and the DOM Refs - provide a way to access DOM nodes or React elements created in the render method.

// When to Use Refs - There are a few good use cases for refs:
// - Managing focus, text selection, or media playback.
// - Triggering imperative animations.
// - Integrating with third-party DOM libraries.
// Avoid using refs for anything that can be done declaratively.

// Don’t Overuse Refs - Your first inclination may be to use refs to “make things happen” in your app. If this is the case, take a moment and think more critically about where state should be owned in the component hierarchy. Often, it becomes clear that the proper place to “own” that state is at a higher level in the hierarchy. See the Lifting State Up guide for examples of this.

// The value of the ref differs depending on the type of the node:
// - When the ref attribute is used on an HTML element, the ref created in the constructor with React.createRef() receives the underlying DOM element as its current property.
// - When the ref attribute is used on a custom class component, the ref object receives the mounted instance of the component as its current.
// - You may not use the ref attribute on function components because they don’t have instances.

function App() {
  return (
    <div className="App">
      <CHome/>
      <FHome/>
    </div>
  );
}

export default App;
