let state = [];
let setters = [];
let cursor = 0;
let renderCount = 0;

function createSetter(cursor) {
    return function setterWithCursor(newVal) {
        state[cursor] = newVal;
    };
}

// This is the pseudocode for the useState helper
export function useState(initVal) {
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
export function RenderFunctionComponentV2() {
    const [firstName, setFirstName] = useState("Rudi"); // cursor: 0
    const [lastName, setLastName] = useState("Yardley"); // cursor: 1
    renderCount++;

    /* Manually triggering click for 3rd render */
    if(renderCount === 3) {
        setFirstName("Richard")
    }

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
    return RenderFunctionComponentV2(); // render
}

console.log(state); // Pre-render: []
MyComponent();
console.log(state); // First-render: ['Rudi', 'Yardley']
MyComponent();
console.log(state); // Subsequent-render: ['Rudi', 'Yardley']
MyComponent();  // click the 'Rudi' button
console.log(state); // After-click: ['Richard', 'Yardley']
