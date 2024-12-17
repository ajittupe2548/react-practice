import './App.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

const Header = () => (
  <div className='header'>
    <p>Header</p>
    <div className='links'>
      <a href='/' className='link'>Home</a>
      <a href='/about' className='link'>About</a>
      <a href='/teams' className='link'>Teams</a>
      <a href='/login' className='link'>Login</a>
    </div>
  </div>
)

const Home = () => <div>Home</div>
const About = () => <div>About</div>
const Teams = () => <div>Teams</div>
const Login = () => <div>Login</div>

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/about' Component={About} />
          <Route path='/teams' Component={Teams} />
          <Route path='/login' Component={Login} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
