import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';
import React from 'react';

function App() {
  return (
    <div className="App">
      {/* JavaScript Expressions as Props */}
      {React.createElement(CHome, {sum: 1+2+3})}
      {/* String Literals */}
      {React.createElement(CHome, {greetings: "Good Morning!"})}
      {/* Props Default to “True” */}
      {React.createElement(CHome, {isMobile: true})}
      <FHome/>
    </div>
  );
}

export default App;
