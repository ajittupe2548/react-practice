import React from 'react';
import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

// Fragments - A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.

// Keyed Fragments - Fragments declared with the explicit <React.Fragment> syntax may have keys. A use case for this is mapping a collection to an array of fragments — for example, to create a description list:
// key is the only attribute that can be passed to Fragment.

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Without the `key`, React will fire a key warning
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

function App() {
  return (
    <div className="App">
      <CHome/>
      <Glossary items={[{id:1, term: "Coffee", description: "Black hot drink"}, {id:2, term: "Milk", description: "White cold drink"}]}/>
    </div>
  );
}

export default App;
