import React from 'react'

// Children in JSX - In JSX expressions that contain both an opening tag and a closing tag, the content between those tags is passed as a special prop: props.children.

function FHome() {
    return (
        <div>
            {/* String Literals */}
            <h1>Hi from functional home page functional</h1>
            <div>This is valid HTML &amp; JSX at the same time.</div>
            {/* JavaScript Expressions as Children */}
            <div>{'foo'}</div>
            {/* Functions as Children */}
            <div>{(() => <div>This is item 1 in the list</div>)()}</div>
            {/* Booleans, Null, and Undefined Are Ignored */}
            <div />
            <div></div>
            <div>{false}</div>
            <div>{null}</div>
            <div>{undefined}</div>
            <div>{true}</div>
        </div>
    )
}

export default FHome;
