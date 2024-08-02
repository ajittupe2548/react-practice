import "./App.css";
import React, { useState, useEffect } from "react";
import { RenderFunctionComponentV2 } from "./useState"; /* Even if we are not using this component don't remove import */

/* https://medium.com/7shifts-rd/why-does-hook-call-order-matter-the-rules-of-react-hooks-explained-55d1dc0a5eff */

function Form() {
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

function App() {
    return (
        <div className="App">
            <Form />
        </div>
    );
}

export default App;
