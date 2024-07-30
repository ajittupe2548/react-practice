import "./App.css";
import useFetch from "./useFetch";

function App() {
    const { data, loading, error } = useFetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    if (loading) return "Loading...";
    if (error) return "Error!";

    return <div className="App">{JSON.stringify(data)}</div>;
}

export default App;
