import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// React Only Updates What’s Necessary
// React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.

function tick() {
  ReactDOM.render(
    <React.StrictMode>
      <h1>It is {new Date().toLocaleTimeString()}</h1>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
