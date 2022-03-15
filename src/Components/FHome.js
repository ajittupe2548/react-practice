import React, {useEffect} from 'react'

function FHome(props) {
    console.log(`*****Output is :  => FHome => FHome`,props.counter)
    useEffect(() => {
    console.log(`*****Output is :  => useEffect => useEffect`,)
    }, [])

    return (
        <div>
            <h1>Hi from functional home page functional {props.counter}</h1>
        </div>
    )
}

export default FHome;
