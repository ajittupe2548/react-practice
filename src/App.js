import './App.css';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';

const Header = () => (
  <div className='header'>
    <p>Header</p>
    <div className='links'>
      <a href='/' className='link'>Home</a>
      <a href='/about' className='link'>About</a>
      <a href='/teams' className='link'>Teams</a>
      <a href='/login' className='link'>Login</a>
      <a href='/profile' className='link'>Profile</a>
      <a href='/cart' className='link'>Cart</a>
    </div>
  </div>
)

const Home = () => <div>Home</div>
const About = () => <div>About</div>
const Teams = () => <div>Teams</div>
const Login = () => <div>Login</div>
const Profile = () => <div>Profile</div>
const Cart = () => <div>Cart</div>

const ProtectedRoutes = () => {
  const isAuthenticated = true;
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

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
          <Route element={<ProtectedRoutes>asdf</ProtectedRoutes>}>
            <Route path='/profile' Component={Profile} />
            <Route path='/cart' Component={Cart} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
