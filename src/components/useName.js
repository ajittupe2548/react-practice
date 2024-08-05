import { useState, useEffect } from "react";

const useName = (defaultName) => {
    const [name, setName] = useState(defaultName);

    useEffect(() => {
        setTimeout(() => {
            setName('Name2')
        }, 1000);
    }, []);

    return [ name ];
};

export default useName;
