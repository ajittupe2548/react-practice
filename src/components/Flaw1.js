import { useState, useEffect } from 'react';

/*
Flaw #1: Can’t Extract a Custom Hook
An alternative banned multiple useState() calls in a component. You’d keep state in one object. That works for classes, right?

- You don’t have to split your state into a bunch of state variables.
- But the point of supporting multiple useState() calls is so that you can extract parts of stateful logic (state + effects) out of your components into custom.
*/

const Form = () => {
    const [name, setName] = useState("Mary"); // State variable 1
    const [surname, setSurname] = useState("Poppins"); // State variable 2
    const [width, setWidth] = useState(window.innerWidth); // State variable 3

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleSurnameChange(e) {
        setSurname(e.target.value);
    }

    return (
        <>
            <input value={name} onChange={handleNameChange} />
            <input value={surname} onChange={handleSurnameChange} />
            <p>
                Hello, {name} {surname}
            </p>
            <p>Window width: {width}</p>
        </>
    );
}

export default Form;