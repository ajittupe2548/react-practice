import './App.css';
import CHome from './Components/CHome';

function App() {
  return (
    <div className="App">
      <CHome/>
      <CHome name="John"/>
      <CHome name={1}/>
    </div>
  );
}

export default App;
