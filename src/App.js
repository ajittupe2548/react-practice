import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useParams,
  NavLink,
  Link,
} from 'react-router-dom';

const Header = () => (
  <div className='header'>
    <p>Header</p>
    <div className='links'>
      <NavLink to="/" className='link'>
        Home
      </NavLink>
      {/* Used link intentionally to check active class */}
      <Link to='/about' className='link'>
        About
      </Link>
      <NavLink to='/teams/frontend' className='link'>
        Teams
      </NavLink>
      <NavLink to='/login' className='link'>
        Login
      </NavLink>
      <NavLink to='/profile' className='link'>
        Profile
      </NavLink>
      <NavLink to='/cart' className='link'>
        Cart
      </NavLink>
    </div>
  </div>
);

const Home = () => <div>Home</div>;
const About = () => <div>About</div>;
const Teams = () => {
  const { id } = useParams();
  return <div>Teams - {id}</div>;
};
const Login = () => <div>Login</div>;
const Profile = () => <div>Profile</div>;
const Cart = () => <div>Cart</div>;

const ProtectedRoutes = () => {
  const isAuthenticated = false;
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/about' Component={About} />
          {/* Dynamic path */}
          <Route path='/teams/:id' Component={Teams} />
          <Route path='/login' Component={Login} />
          {/* Protected Route */}
          <Route element={<ProtectedRoutes />}>
            <Route path='/profile' Component={Profile} />
            <Route path='/cart' Component={Cart} />
          </Route>
          {/* Redirect example */}
          <Route path='/old-route' element={<Navigate to='/about' />} />
          {/* Fallback 404 Page */}
          <Route path='*' element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
