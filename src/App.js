import { useState, useEffect, useRef, useCallback } from 'react';
import Approach1 from './Apprach1';
import './App.css';

const debounce = function (callback, delay) {
  let timeoutId = null;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  }
}

function App() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const debouncedInputChange = useRef(debounce(setDebouncedText, 500));

  const isValidName = useCallback((item) => {
    return item.firstName.toLowerCase().includes(debouncedText.toLowerCase()) ||
      item.lastName.toLowerCase().includes(debouncedText.toLowerCase())
  }, [debouncedText]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://dummyjson.com/users');
        const data = await res.json();
        setUsers(data.users);
      }
      catch (err) {
        console.log('Err', err);
      }
    }

    fetchUsers();
  }, []);

  const handleDebounceChange = (e) => {
    const value = e.target.value;
    setText(value);
    debouncedInputChange.current(value);
  };

  const filteredUsers = users.filter(isValidName);

  return (
    <div className="App">
      <input type='text' value={text} onChange={handleDebounceChange} />
      <ul>
        {filteredUsers.map((item) => (
          <li key={item.id}>
            {item.firstName} {item.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
