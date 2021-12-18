import React, { useState, createContext, useContext } from 'react'

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
