import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';
import ErrorBoundary from './Components/ErrorBoundary'

// In the past, JavaScript errors inside components used to corrupt React’s internal state and cause it to emit cryptic errors on next renders. These errors were always caused by an earlier error in the application code, but React did not provide a way to handle them gracefully in components, and could not recover from them.

// Error Boundaries - Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

// Note - Error boundaries do not catch errors for:
// 1) Event handlers (learn more)
// 2) Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
// 3)Server side rendering
// 4) Errors thrown in the error boundary itself (rather than its children)

// Where to Place Error Boundaries - The granularity of error boundaries is up to you. You may wrap top-level route components to display a “Something went wrong” message to the user, just like how server-side frameworks often handle crashes. You may also wrap individual widgets in an error boundary to protect them from crashing the rest of the application.

// How About try/catch?
// try / catch is great but it only works for imperative code:
// try {
//   showButton();
// } catch (error) {
//   // ...
// }
// However, React components are declarative and specify what should be rendered:
// <Button />
// Error boundaries preserve the declarative nature of React, and behave as you would expect. For example, even if an error occurs in a componentDidUpdate method caused by a setState somewhere deep in the tree, it will still correctly propagate to the closest error boundary.

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <CHome heroName="Batman"/>
      </ErrorBoundary>
      <ErrorBoundary>
        <CHome heroName="Joker"/>
      </ErrorBoundary>
      <FHome/>
    </div>
  );
}

export default App;
