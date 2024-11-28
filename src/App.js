import './App.css';
import React, { useState, useTransition } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    startTransition(() => {
      let list = [];
      for (let i = 0; i < 50000; i++) {
        list.push(value);
      }
      setList(list);
    });
  };

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search items..."
      />
      {isPending && <p>Loading...</p>}
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
