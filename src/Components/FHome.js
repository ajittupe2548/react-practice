import React from 'react'

// Memo - React.memo is a higher order component.
// If your component renders the same result given the same props, you can wrap it in a call to React.memo for a performance boost in some cases by memoizing the result. This means that React will skip rendering the component, and reuse the last rendered result.
// React.memo only checks for prop changes. If your function component wrapped in React.memo has a useState, useReducer or useContext Hook in its implementation, it will still rerender when state or context change.
// By default it will only shallowly compare complex objects in the props object. If you want control over the comparison, you can also provide a custom comparison function as the second argument.
const MemoExample = React.memo(function FHome() {
    // React.createElement - Create and return a new React element of the given type. The type argument can be either a tag name string (such as 'div' or 'span'), a React component type (a class or a function), or a React fragment type. Code written with JSX will be converted to use React.createElement(). You will not typically invoke React.createElement() directly if you are using JSX.
    const createElement = React.createElement("h1",{className:"heading"},"John");
    return (
        <div>
            {createElement}
        </div>
    )
})

const FunctionExample = () => {
    return (
        <div>
            Functional
        </div>
    )
}

// Functional component
function FHome() {
    return (
        <div>
            <FunctionExample />
            <MemoExample />
        </div>
    )
}

export default FHome;
