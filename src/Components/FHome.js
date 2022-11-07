import React, { useState, useEffect } from 'react';

function FHome({name}) {
    const [count, setCount] = useState(1);

    const tick = () => {
        setCount(prevState => prevState+1)
    }

    useEffect(() => {
        setInterval(tick, 1000);
    }, []);

    return (
        <div>
            <h1>functional - {name} - {count}</h1>
        </div>
    )
}

export default FHome;
