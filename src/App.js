import './App.css';
import useFetchHook from './hooks/useFetchHook';
import Table from './components/Table';
import Loading from './components/Loading';
import Error from './components/Error';

function App() {
  const { data, loading, error } = useFetchHook('https://jsonplaceholder.typicode.com/posts');

  return (
    <div>
      {
        error ? <Error /> :
          loading ? <Loading /> :
            <Table data={data} />
      }
    </div>
  );
}

export default App;
