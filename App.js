import React from 'react';
import ReactDOM from 'react-dom/client';

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));

/* JSX => React.createElement => Object => HTML(DOM) */

const reactHeadingContainer = (
    <div className='react-heading-container'>
        <h2 className="react-heading">Hello World 1 from React!</h2>
        <h2 className="react-heading">Hello World 2 from React!</h2>
    </div>
);

const HeaderComponent = () => {
    return (
        <>
            {reactHeadingContainer}
            <h2 className="react-heading">Hello World 3 from React!</h2>
        </>
    );
}

reactRoot.render(<HeaderComponent />);