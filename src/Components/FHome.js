import React, { useState } from 'react'

// This hook allows you to add state to functional components. It returns a stateful value and a function to update that value.

function FHome() {
    // We initialize our state by calling useState in our function component.
    // useState accepts an initial state and returns two values:
    // 1) The current state.
    // 2) A function that updates the state.
    const countState = useState(0);
    return (
        <div>
            <h1>Hi from functional home page functional</h1>
            {/* We can now include our state anywhere in our component.
            To update our state, we use our state updater function. */}
            <button onClick={() => countState[1](countState[0]+1)}>Clicked {countState[0]} times.</button>
        </div>
    )
}

export default FHome;

// The useState Hook can be used to keep track of strings, numbers, booleans, arrays, objects, and any combination of these!
