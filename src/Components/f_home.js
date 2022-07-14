import React from 'react'

// This function is a valid React component because it accepts a single “props” object argument with data and returns a React element. We call such components “function components” because they are literally JavaScript functions.

function f_home(props) {
    return (
        <div>
            <h1>Hi {props.name}</h1>
        </div>
    )
}

export default f_home;
