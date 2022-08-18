import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';
import RouteBasedSplitting from './Components/RouteBasedSplitting';

// Most React apps will have their files “bundled” using tools like Webpack, Rollup or Browserify. Bundling is the process of following imported files and merging them into a single file: a “bundle”. This bundle can then be included on a webpage to load an entire app at once.

// Code Splitting - Bundling is great, but as your app grows, your bundle will grow too. You need to keep an eye on the code you are including in your bundle so that you don’t accidentally make it so large that your app takes a long time to load.
// Code-splitting your app can help you “lazy-load” just the things that are currently needed by the user, which can dramatically improve the performance of your app.

// import() - The best way to introduce code-splitting into your app is through the dynamic import() syntax.
// Before:
// import { add } from './math';
// console.log(add(16, 26));
// After:
// import("./math").then(math => {
//   console.log(math.add(16, 26));
// });

// React.lazy - The React.lazy function lets you render a dynamic import as a regular component.
// Before:
// import OtherComponent from './OtherComponent';
// After:
// const OtherComponent = React.lazy(() => import('./OtherComponent'));
// This will automatically load the bundle containing the OtherComponent when this component is first rendered.
// React.lazy takes a function that must call a dynamic import(). This must return a Promise which resolves to a module with a default export containing a React component.

// Error boundaries - If the other module fails to load, it will trigger an error. You can handle these errors to show a nice user experience and manage recovery with Error Boundaries.

// Route-based code splitting 

function App() {
  return (
    <div className="App">
      <FHome/>
      <RouteBasedSplitting />
    </div>
  );
}

export default App;
