import React, { useState, useEffect, useMemo } from "react";

const HeavyFunctional = () => {
    const [count, setCount] = useState(0);
    const [items, setItems] = useState(0);

    useEffect(() => {
        if (count === 1) {
            setItems(50000);
        }
    }, [count]);

    const getList = useMemo(() => {
        const startRender = performance.now();

        const a = (
            <ul>
                {
                    Array(items).fill(1).map((item, index) => <li key={index}>{index}</li>)
                }
            </ul>
        )

        const endRender = performance.now();
        console.log(`Time spent rendering DOM: ${endRender - startRender} ms`);

        return a;
    }, [items]);


    return (
        <div>
            <h1>Heavy Component (Functional)</h1>
            <p>Fibonacci(40): {items}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            {getList}
        </div>
    );
};

export default HeavyFunctional;
