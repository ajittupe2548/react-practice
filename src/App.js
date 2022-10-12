import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';
import {Profiler} from 'react'

// The Profiler measures how often a React application renders and what the “cost” of rendering is. Its purpose is to help identify parts of an application that are slow and may benefit from optimizations such as memoization.
// Note: Profiling adds some additional overhead, so it is disabled in the production build. To opt into production profiling, React provides a special production build with profiling enabled. Read more about how to use this build at fb.me/react-profiling

// A Profiler can be added anywhere in a React tree to measure the cost of rendering that part of the tree. It requires two props: an id (string) and an onRender callback (function) which React calls any time a component within the tree “commits” an update.

// onRender Callback - The Profiler requires an onRender function as a prop. React calls this function any time a component within the profiled tree “commits” an update. It receives parameters describing what was rendered and how long it took.

function App() {
  const callback = (
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) => {
    console.log("Updated!")
  }

  return (
    <div className="App">
      <Profiler id="CHome" onRender={callback}>
        <CHome/>
      </Profiler>
      <FHome/>
    </div>
  );
}

export default App;
