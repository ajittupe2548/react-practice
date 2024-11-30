import React, { useState } from "react";

const LightFunctional = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Light Component (Functional)</h1>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
};

export default LightFunctional;
