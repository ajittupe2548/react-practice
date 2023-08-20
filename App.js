import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
    return <Header />;
};

reactRoot.render(<App />);
