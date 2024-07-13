import './App.css';
import FileExplorer from './Components/FileExplorer';
import data from './data.json';

function App() {
  return (
    <div className="App">
      <FileExplorer fileExplorerData={data} />
    </div>
  );
}

export default App;
