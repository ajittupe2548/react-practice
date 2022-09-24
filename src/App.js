import './App.css';
import CHome from './Components/CHome';

function App() {
  return (
    <div className="App">
      <CHome/>
    </div>
  );
}

export default App;

// A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.
// Concretely, a higher-order component is a function that takes a component and returns a new component.

// Note that a HOC doesn’t modify the input component, nor does it use inheritance to copy its behavior. Rather, a HOC composes the original component by wrapping it in a container component. A HOC is a pure function with zero side-effects.

// Don’t Mutate the Original Component. Use Composition. - Resist the temptation to modify a component’s prototype (or otherwise mutate it) inside a HOC.

// Convention: Pass Unrelated Props Through to the Wrapped Component -HOCs should pass through props that are unrelated to its specific concern.

// Convention: Maximizing Composability
// Not all HOCs look the same. Sometimes they accept only a single argument, the wrapped component:
// const NavbarWithRouter = withRouter(Navbar);
// Usually, HOCs accept additional arguments.
// const CommentWithRelay = Relay.createContainer(Comment, config);
// The most common signature for HOCs looks like this:
// React Redux's `connect`
// const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
// What?! If you break it apart, it’s easier to see what’s going on.
// const enhance = connect(commentListSelector, commentListActions);
// const ConnectedComment = enhance(CommentList);

// Convention: Wrap the Display Name for Easy Debugging

// Caveats
// 1) Don’t Use HOCs Inside the render Method - React’s diffing algorithm (called Reconciliation) uses component identity to determine whether it should update the existing subtree or throw it away and mount a new one. If the component returned from render is identical (===) to the component from the previous render, React recursively updates the subtree by diffing it with the new one. If they’re not equal, the previous subtree is unmounted completely.

// render() {
//   // A new version of EnhancedComponent is created on every render
//   // EnhancedComponent1 !== EnhancedComponent2
//   const EnhancedComponent = enhance(MyComponent);
//   // That causes the entire subtree to unmount/remount each time!
//   return <EnhancedComponent />;
// }

// 2) Static Methods Must Be Copied Over - When you apply a HOC to a component, though, the original component is wrapped with a container component. That means the new component does not have any of the static methods of the original component.
// // Define a static method
// WrappedComponent.staticMethod = function() {/*...*/}
// // Now apply a HOC
// const EnhancedComponent = enhance(WrappedComponent);

// // The enhanced component has no static method
// typeof EnhancedComponent.staticMethod === 'undefined' // true
// To solve this, you could copy the methods onto the container before returning it:
// function enhance(WrappedComponent) {
//   class Enhance extends React.Component {/*...*/}
//   // Must know exactly which method(s) to copy :(
//   Enhance.staticMethod = WrappedComponent.staticMethod;
//   return Enhance;
// }
// However, this requires you to know exactly which methods need to be copied. You can use hoist-non-react-statics to automatically copy all non-React static methods:

// import hoistNonReactStatic from 'hoist-non-react-statics';
// function enhance(WrappedComponent) {
//   class Enhance extends React.Component {/*...*/}
//   hoistNonReactStatic(Enhance, WrappedComponent);
//   return Enhance;
// }

// 3) Refs Aren’t Passed Through - While the convention for higher-order components is to pass through all props to the wrapped component, this does not work for refs. That’s because ref is not really a prop — like key, it’s handled specially by React. If you add a ref to an element whose component is the result of a HOC, the ref refers to an instance of the outermost container component, not the wrapped component.