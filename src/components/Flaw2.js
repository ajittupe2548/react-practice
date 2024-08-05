import { useState, useEffect } from 'react';
import useName from './useName';

/*
Flaw #2: Name Clashes
One common suggestion is to let useState() accept a key argument (e.g. a string) that uniquely identifies a particular state variable within a component. With this proposal, any time you add a new state variable inside a custom Hook, you risk breaking any components that use it (directly or transitively) because they might already use the same name for their own state variables.

- The actual Hooks proposal solves this by relying on the call order: even if two Hooks use a name state variable, they would be isolated from each other. Every useState() call gets its own “memory cell”.

*/

const Form = () => {
    const [name, setName] = useState("Mary"); // State variable 1
    const [surname, setSurname] = useState("Poppins"); // State variable 2
    const [width, setWidth] = useState(window.innerWidth); // State variable 3
    const [name2] = useName("Mary"); // State variable with same name inside custom hook 1
    const [surname2] = useName("Poppins"); // State variable with same name inside custom hook 2

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
            <p>
                Hello, {name2} {surname2}
            </p>
            <p>Window width: {width}</p>
        </>
    );
}

export default Form;