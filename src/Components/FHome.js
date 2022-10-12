import React, { useState, useEffect } from 'react';

function FHome() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCount(count => count + 1);
        }, 1000);
    }, []);

    return (
        <div>
            <h1>Hi from functional home page functional - {count}</h1>
        </div>
    )
}

export default FHome;
