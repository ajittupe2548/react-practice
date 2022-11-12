import React, { useRef, useState } from 'react';

function FHome() {
    const inputRef = useRef();
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleClick = () => {
        console.log(value)
    }

    const handleFocus = () => {
        inputRef.current.focus();
    }

    return (
        <div>
            <input onChange={handleChange} ref={inputRef} value={value} type="text" />
            <button onClick={handleFocus}>Focus</button>
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}

export default FHome;
