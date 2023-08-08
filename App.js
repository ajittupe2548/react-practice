import React, { useState, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import useOnline from './hooks/useOnline';
import useSessionStorage from './hooks/useSessionStorage';

const LazyLargeContent = lazy(() => import('./LargeContent'));

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const [loadLargeContent, setLoadLargeContent] = useState(false);
    const isOnline = useOnline();
    const [getSessionStorage, setSessionStorage] = useSessionStorage();

    const handleKeyChange = e => {
        setKey(e.target.value);
    }

    const handleValueChange = e => {
        setValue(e.target.value);
    }

    const handleGetClick = () => {
        setValue(getSessionStorage(key));
    }

    const handleSetClick = () => {
        setSessionStorage(key, value);
    }

    const handleLoadContent = () => {
        setLoadLargeContent(!loadLargeContent);
    }

    return (
        <>
            <h2>{isOnline ? 'online' : 'offline'}</h2>
            <input type="text" placeholder="Key" value={key} onChange={(e) => handleKeyChange(e)} />
            <button onClick={() => handleGetClick()}>Get</button>
            <input type="text" placeholder="Value" value={value} onChange={(e) => handleValueChange(e)} />
            <button onClick={() => handleSetClick()}>Set</button><br />
            <button onClick={() => handleLoadContent()}>Load Large Content</button>
            <div>{loadLargeContent ? <Suspense fallback="Loading..."><LazyLargeContent /></Suspense> : "null"}</div>
        </>
    )
}

reactRoot.render(<App />);