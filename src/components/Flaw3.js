import { useState, useEffect } from 'react';
import useName from './useName';

/*
Flaw #3: Can’t Call the Same Hook Twice

Another variation of the “keyed” useState proposal is to use something like Symbols. Those can’t clash, right?

- The actual Hooks proposal doesn’t have this problem because each call to useState() gets its own isolated state. Relying on a persistent call index frees us from worrying about name clashes.
*/

const nameKey = Symbol();
const surnameKey = Symbol();
const widthKey = Symbol();

function useWindowWidth() {
    const [width, setWidth] = useState(widthKey);
    console.log(`*****Output is :  => useWindowWidth => width:`, width)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });
    return width;
}

function Form() {
    const [name, setName] = useState(nameKey);              // State variable 1
    const [surname, setSurname] = useState(surnameKey);     // State variable 2
    const width = useWindowWidth();

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
            <p>Hello, {name} {surname}</p>
            <p>Window width: {width}</p>
        </>
    );
}

export default Form;