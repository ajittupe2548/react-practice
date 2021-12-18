import React, { useState, useEffect } from 'react'

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