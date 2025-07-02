import { useState, useEffect, useMemo } from 'react';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    const [text, setText] = useState('');
    const [filterText, setFilterText] = useState('');

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

    useEffect(() => {
        const id = setTimeout(() => {
            setFilterText(text);
        }, 500);

        return () => {
            clearTimeout(id);
        }
    }, [text]);

    const filteredList = useMemo(() => {
        const lower = filterText.toLowerCase();

        return users.filter(
            (user) =>
                user.firstName.toLowerCase().includes(lower) ||
                user.lastName.toLowerCase().includes(lower)
        );

    }, [filterText, users])

    return (
        <div>
            <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
            <ul>
                {
                    filteredList.map((item) => {
                        return (
                            <li key={item.id}>{item.firstName} {item.lastName}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default App;
