import React, { useState } from 'react'

function UseStateObject() {
    const [car, setCar] = useState({
        brand: "Ford",
        model: "Mustang",
        year: "1999",
        color: "black"
    });
    const updateColor = () => {
        setCar(prevState => {
            // If we only called setCar({color: "blue"}), this would remove the brand, model, and year from our state.
            // We can use the JavaScript spread operator to help us.
            return {...prevState, color:"blue"}
        })
    }
    return (
        <div>
            <h1>My {car.brand}</h1>
            <p>
                It is a {car.color} {car.model} from {car.year}.
            </p>
            <button type="button" onClick={updateColor} >Blue</button>
        </div>
    )
}

export default UseStateObject;