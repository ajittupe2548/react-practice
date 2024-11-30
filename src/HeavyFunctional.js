import React, { useState, useEffect } from "react";

// Fibonacci calculation (expensive operation)
const fibonacci = (n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
};

const HeavyFunctional = () => {
    const [count, setCount] = useState(0);
    const [fibNumber, setFibNumber] = useState(0);

    // UseEffect to simulate heavy computation on every render
    useEffect(() => {
        const result = fibonacci(40); // Fibonacci of 40 is very expensive
        setFibNumber(result);
    }, [count]);

    return (
        <div>
            <h1>Heavy Component (Functional)</h1>
            <p>Fibonacci(40): {fibNumber}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
};

export default HeavyFunctional;
