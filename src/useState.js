/* https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e */

let state = [];
let setters = [];
let cursor = 0;
let renderCount = 0;

function createSetter(cursor) {
    return function setterWithCursor(newVal) {
        state[cursor] = newVal;
    };
}

// This is the pseudocode for the useStateCustom helper
export function useStateCustom(initVal) {
    if (renderCount===0) {
        state.push(initVal);
        setters.push(createSetter(cursor));
    }

    const setter = setters[cursor];
    const value = state[cursor];

    cursor++;
    return [value, setter];
}

// Our component code that uses hooks
export function RenderFunctionComponent() {
    let init;
    /* If we uncomment the code below, then for the first render, we have three states (init, firstName, lastName) and three setter functions (()=>{}, setFirstName, setLastName). However, for subsequent renders, we will only have two states (firstName, lastName) and two setters (setFirstName, setLastName). But our global state array will still have three states (init, firstName, lastName) and three setters (()=>{}, setFirstName, setLastName). So, for render 2 and onwards, our firstName setter will get attached to the init setter in the global state, and the other setters will shift by one. */
    // if(renderCount === 0) {
    //     [init] = useStateCustom("Init");
    // }

    const [firstName, setFirstName] = useStateCustom("Rudi"); // cursor: 0
    const [lastName, setLastName] = useStateCustom("Yardley"); // cursor: 1

    /* Manually triggering click for 3rd render */
    if(renderCount === 2) {
        setFirstName("Richard")
    }

    renderCount++;

    return (
        <div>
            <button onClick={() => setFirstName("Richard")}>{firstName}</button>
            <button onClick={() => setLastName("Fred")}>{lastName}</button>
        </div>
    );
}

// This is sort of simulating Reacts rendering cycle
function MyComponent() {
    cursor = 0; // resetting the cursor
    return RenderFunctionComponent(); // render
}

console.log(state); // Pre-render: []
MyComponent();
console.log(state); // First-render: ['Rudi', 'Yardley']
MyComponent();
console.log(state); // Subsequent-render: ['Rudi', 'Yardley']
MyComponent();  // click the 'Rudi' button
console.log(state); // After-click: ['Richard', 'Yardley']
