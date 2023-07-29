import React, { useState, useEffect } from 'react'

// This hook enables you to perform side effects in functional components. It replaces lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount.
// useEffect callback cannot be declared as an async function directly. However, you can use an immediately-invoked function expression (IIFE) inside the useEffect to work with async functions.

function UseEffectWithDependency() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);
        }, 1000);

        // Will work as ComponentDidUnmount
        return () => clearTimeout(timer)
        //Runs on every render
        // });
        //Runs only on the first render
        // },[]);
        //Runs on the first render
        //And any time any dependency value changes
    }, [count]);


    return <h1>I have rendered {count} times!</h1>;
}

export default UseEffectWithDependency;