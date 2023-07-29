// You must import Hooks from react.
import React, { useState } from 'react'

// React hooks are a feature introduced in React version 16.8 to allow developers to use state and other React features in functional components, which were previously limited to class components. Prior to hooks, developers had to use class components to manage state and lifecycle methods.

// Hooks can only be called inside React function components.
function FHome() {
    // Hooks can only be called at the top level of a component.
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>Hi from functional home page functional</h1>
            <button onClick={() => setCount(count + 1)}>Click {count} times</button>
        </div>
    )
}

export default FHome;
