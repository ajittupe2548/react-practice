import React from 'react';
import ReactDOM from 'react-dom/client';

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
    return (
        <h1 class="text-2xl font-bold bg-blue-600 hover:bg-blue-500 text-white md:bg-red-500 sm:bg-green-500 pl-10 pr-[11px]">
            Hello world!
        </h1>
    )
}

reactRoot.render(<App />);