import React, { useRef } from 'react';
import InputWithHOCWithRef from './InputWithHOC';

// Forwarding refs in higher-order components
function FHome() {
    const inputRef = useRef();
    const handleClick = () => {
        if(inputRef) {
            inputRef.current.focus();
        }
    }
    return (
        <div>
            <InputWithHOCWithRef ref={inputRef}/>
            <button onClick={handleClick}>Focus Input</button>
        </div>
    )
}

export default FHome;
