import React, {useEffect,useRef, useState} from 'react'

function UseRefWithInterval() {
    const [timer, setTimer] = useState(0);
    const intervalRef = useRef(0);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1)
        }, 1000)
        return () => clearInterval(intervalRef.current);
    },[])

    return (
        <div>
            <p>Hook time - {timer}</p>
            <button onClick={() => clearInterval(intervalRef.current)}>Clear</button>
        </div>
    )
}

export default UseRefWithInterval;