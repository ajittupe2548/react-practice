import './App.css';
import React, { useState, useDeferredValue, Suspense, useMemo } from "react";

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);

  const list = useMemo(() => {
    const l = [];
    for (let i = 0; i < 50000; i++) {
      l.push(<div key={i}>{deferredQuery}</div>)
    }
    return l;
  }, [deferredQuery]);

  return list;
}

function App() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <SearchResults query={query} />
    </div>
  );
}

export default App;
