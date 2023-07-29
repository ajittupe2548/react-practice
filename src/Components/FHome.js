import React, { useEffect, useRef } from 'react'

// useRef hook is used to create a mutable reference to a DOM element or any other value that persists across renders. Unlike useState, updating the value stored in a useRef does not trigger a re-render of the component. It is often used to interact with the DOM directly or to hold onto a value that you want to persist between renders without causing a re-render.

function FHome() {

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, [])
    return (
        <div>
            <input ref={inputRef} type="text" />
        </div>
    )
}

export default FHome;
