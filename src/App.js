import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';
import { ThemeProvider } from './Components/ThemeContext';
import { UserProvider } from './Components/UserContext';

function App() {
  return (
    <div className="App">
      <ThemeProvider value={"Dark"}>
        <UserProvider value={"Ajit"}>
          <FHome />
          <CHome />
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
