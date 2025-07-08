import { useEffect, useState } from 'react';
import './App.css';

// function App() {
//   const controller = new AbortController();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(``, {signal: controller.signal});
//         const data = await res.json();
//       }
//       catch(err) {
//         console.log('Err',err)
//       }
//     }

//     setTimeout(() => {
//       controller.abort();
//     }, 1000);

//     fetchData();
//   })
//   return (
//     <div className="App">
//     </div>
//   );
// }

/*
- Carwale's experience
- Controlled vs uncontrolled component
- Challenging work that you have done -> hashing and draggable fab
- ES property backend logic
- How to optimize large form items -> can use useFormHook like thing
- How to optimize large list of data having expand collapse feature
- React query
- Memory leak in react component - how to detect and fix?
- Lifecycle methods in class and functional component
- Theme value to persist in web with react-redux too
- Navigation for react application  -> react-router
- how do you test components in your app -> jest flow
- how do you maintain library and how do you consume it in the applications
- How to cancel api request? Implementation
- Post fetching and filter with debounce implementation
- Personal projects details -> sync-board, portfolio, social media app
- About armada
*/

function App() {
    const [posts, setPosts] = useState([]);
    const [value, setValue] = useState('');
    const [debouncedText, setDeboucedText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await res.json();
                setPosts(data);
            }
            catch (err) {
                console.log('Err', err)
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const id = setTimeout(() => {
            setDeboucedText(value);
        }, 300);

        return () => {
            clearTimeout(id);
        }
    }, [value]);

    const handleInputChange = e => {
        setValue(e.target.value);
    }

    const filteredPosts = posts.filter((item) => {
        if (item.title.toLowerCase().includes(debouncedText.toLowerCase())) {
            return true;
        }
        return false;
    });

    return (
        <div>
            <input value={value} onChange={handleInputChange} />
            <ul>
                {
                    filteredPosts.map((item) => {
                        return (
                            <li className='list-item' key={item.id}>{item.title}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default App;
