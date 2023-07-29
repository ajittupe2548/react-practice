import React, { useState, createContext, useContext } from 'react'

// The useContext hook is a feature provided by React that allows components to consume data from a Context without explicitly passing it down through props.
// This hook allows you to consume values from a React context in a functional component. It replaces the need for a Consumer component in class components.

function FHome() {
    return (
        <div>
            <Component1 />
        </div>
    )
}

const UserContext = createContext()
function Component1() {
    const [user, setUser] = useState("Jesse Hall");

    return (
        <>
            <UserContext.Provider value={user}>
                <h1>{`Hello ${user}!`}</h1>
                <Component2 user={user} />
            </UserContext.Provider>
        </>
    );
}

function Component2({ user }) {
    return (
        <>
            <h1>Component 2</h1>
            <Component3 user={user} />
        </>
    );
}

function Component3({ user }) {
    return (
        <>
            <h1>Component 3</h1>
            <Component4 user={user} />
        </>
    );
}

function Component4({ user }) {
    return (
        <>
            <h1>Component 4</h1>
            <Component5 user={user} />
        </>
    );
}

function Component5() {
    const user = useContext(UserContext);
    return (
        <>
            <h1>Component 5</h1>
            <h2>{`Hello ${user} again!`}</h2>
        </>
    );
}

export default FHome;
