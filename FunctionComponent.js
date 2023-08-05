import React, { useState, useEffect } from "react";

export const Home = () => {
    useEffect(() => {
        console.log(`*****Output is :  => useEffect:`)
    })

    console.log(`*****Output is :  => Home:`)

    return (
        <>
            <Home1 />
            <Home2 />
        </>
    );
};

const Home1 = () => {
    useEffect(() => {
        console.log(`*****Output is Home1 :  => useEffect:`);

        (async () => {
            const data = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await data.json();
            console.log(`*****Output is :  => users:`, users)
        })();
    }, [])

    console.log(`*****Output is :  => Home1:`)

    return (
        <>
            <h2>Home 1</h2>
        </>
    );
}

const Home2 = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            console.log(`*****Output is :  => timer => setInterval:`)
        }, 1000);

        return () => {
            clearInterval(timer)
        }
    }, []);

    useEffect(() => {
        console.log(`*****Output is : Home2 => useEffect:`)
    })

    console.log(`*****Output is :  => Home2:`)

    return (
        <>
            <h2 onClick={() => setCount(count + 1)}>Home 2 - {count}</h2>
        </>
    );
}

export const About = () => {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    const increment = () => {
        /* This will re-render component after button click - Component re-render doesn't depend on individual state update. */
        setCount1(count1 + 1);
        setCount2(count2 + 1);
    }

    console.log(`*****Output is : => About:`)

    return (
        <>
            <h2>About</h2>
            <p>Count 1 - {count1}</p>
            <p>Count 2 - {count2}</p>
            <button onClick={() => increment()}>Increment</button>
        </>
    );
};
