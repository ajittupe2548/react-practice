import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';
import ErrorBoundary from './Components/ErrorBoundary'

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <CHome heroName="Batman"/>
      </ErrorBoundary>
      <ErrorBoundary>
        <CHome heroName="Joker"/>
      </ErrorBoundary>
      <FHome/>
    </div>
  );
}

export default App;
