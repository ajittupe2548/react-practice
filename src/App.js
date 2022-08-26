import {useState} from 'react';
import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';
import { ThemeProvider } from './Components/ThemeContext';
import { UserProvider } from './Components/UserContext';
import { CountProvider, } from './Components/CountContext';

// Context provides a way to pass data through the component tree without having to pass props down manually at every level.

// When to Use Context
// Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.

// API
// React.createContext
// const MyContext = React.createContext(defaultValue);
// Creates a Context object. When React renders a component that subscribes to this Context object it will read the current context value from the closest matching Provider above it in the tree.

// Context.Provider
// <MyContext.Provider value={/* some value */}>
// Every Context object comes with a Provider React component that allows consuming components to subscribe to context changes.

// The Provider component accepts a value prop to be passed to consuming components that are descendants of this Provider. One Provider can be connected to many consumers. Providers can be nested to override values deeper within the tree.

// All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes. The propagation from Provider to its descendant consumers (including .contextType and useContext) is not subject to the shouldComponentUpdate method, so the consumer is updated even when an ancestor component skips an update.

// Context.Consumer
// <MyContext.Consumer>
//   {value => /* render something based on the context value */}
// </MyContext.Consumer>
// A React component that subscribes to context changes. Using this component lets you subscribe to a context within a function component.

// Requires a function as a child. The function receives the current context value and returns a React node. The value argument passed to the function will be equal to the value prop of the closest Provider for this context above in the tree. If there is no Provider for this context above, the value argument will be equal to the defaultValue that was passed to createContext().

// Context.displayName
// Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context.

// For example, the following component will appear as MyDisplayName in the DevTools:

// const MyContext = React.createContext(/* some value */);
// MyContext.displayName = 'MyDisplayName';

// <MyContext.Provider> // "MyDisplayName.Provider" in DevTools
// <MyContext.Consumer> // "MyDisplayName.Consumer" in DevTools

// Updating Context from a Nested Component - It is often necessary to update the context from a component that is nested somewhere deeply in the component tree. In this case you can pass a function down through the context to allow consumers to update the context:

function App() {
  const [count, setCount] = useState({counter:0});
  const handleCount = shouldIncrement => {
    shouldIncrement ? setCount({counter: count.counter+1}) : setCount({counter: count.counter-1});
  }
  return (
    <div className="App">
      <ThemeProvider value={"Dark"}>
        <UserProvider value={"Ajit"}>
          <CountProvider value={{count, handleCount}}>
            <FHome />
            <CHome />
          </CountProvider>
          {/* Added to show default value */}
          <FHome />
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
