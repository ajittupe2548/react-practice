import React from 'react';
import ReactDOM from 'react-dom/client';

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));

const Parent = ({name}) => {
    return (
        <>
            <Child1 name={name} />
            <Child2 name={name} />
        </>
    )
}

const Child1 = ({name}) => {
    return (
        <>
            <GrandChild1 name={name} />
        </>
    )
}

const GrandChild1 = ({name}) => {
    return (
        <>
            <p>GrandChild 1 : {name}</p>
        </>
    )
}

const Child2 = ({name}) => {
    return (
        <>
            <GrandChild2 name={name} />
        </>
    )
}

const GrandChild2 = ({name}) => {
    return (
        <>
            <p>GrandChild 2 : {name}</p>
        </>
    )
}

const App = () => {
    return (
        <>
            <Parent name="John" />
        </>
    )
}

reactRoot.render(<App />);