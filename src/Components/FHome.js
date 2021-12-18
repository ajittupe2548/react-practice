// You must import Hooks from react.
import React, {useState} from 'react'

// Hooks can only be called inside React function components.
function FHome() {
    // Hooks can only be called at the top level of a component.
    const [count, setCount ] = useState(0);
    return (
        <div>
            <h1>Hi from functional home page functional</h1>
            <button onClick={() => setCount(count + 1)}>Click {count} times</button>
        </div>
    )
}

export default FHome;
