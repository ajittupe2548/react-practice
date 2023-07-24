import React from 'react';
import ReactDOM from 'react-dom/client';

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));

const reactHeadingContainer = React.createElement("h2", {}, "Hi!");

reactRoot.render(reactHeadingContainer);