import './App.css';
import { Profiler } from 'react';
import HeavyFunctional from './HeavyFunctional';
import HeavyClass from './HeavyClass';
import LightFunctional from './LightFunctional';
import LightClass from './LightClass';

// The Profiler measures how often a React application renders and what the “cost” of rendering is. Its purpose is to help identify parts of an application that are slow and may benefit from optimizations such as memoization.
// Note: Profiling adds some additional overhead, so it is disabled in the production build. To opt into production profiling, React provides a special production build with profiling enabled. Read more about how to use this build at fb.me/react-profiling

// A Profiler can be added anywhere in a React tree to measure the cost of rendering that part of the tree. It requires two props: an id (string) and an onRender callback (function) which React calls any time a component within the tree “commits” an update.

// onRender Callback - The Profiler requires an onRender function as a prop. React calls this function any time a component within the profiled tree “commits” an update. It receives parameters describing what was rendered and how long it took.

const onRenderCallback = (
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) => {
  console.log(`*****Output is :  => App => callback:`, {
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  });
};

function App() {
  return (
    <div>
      <h1>Performance Comparison</h1>

      <Profiler id='HeavyFunctional' onRender={onRenderCallback}>
        <HeavyFunctional />
      </Profiler>

      <Profiler id='HeavyClass' onRender={onRenderCallback}>
        <HeavyClass />
      </Profiler>

      <Profiler id='LightFunctional' onRender={onRenderCallback}>
        <LightFunctional />
      </Profiler>

      <Profiler id='LightClass' onRender={onRenderCallback}>
        <LightClass />
      </Profiler>
    </div>
  );
}

export default App;
