import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

// JSX is not a requirement for using React. Using React without JSX is especially convenient when you don’t want to set up compilation in your build environment. Each JSX element is just syntactic sugar for calling React.createElement(component, props, ...children). So, anything you can do with JSX can also be done with just plain JavaScript.

// If you’re curious to see more examples of how JSX is converted to JavaScript, you can try out the online Babel compiler (https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=7.20.4&externalPlugins=&assumptions=%7B%7D).

function App() {
  return (
    <div className="App">
      <CHome toWhat="world" />
      <FHome/>
    </div>
  );
}

export default App;
