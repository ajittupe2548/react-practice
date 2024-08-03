import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Listing from './Listing';
import Details from './Details';

const Header = () => {
  return (
    <div className='navBar'>
      <Link to='/' className='navItem'>
        Home
      </Link>
      <Link to='/listing' className='navItem'>
        Listing
      </Link>
      <Link to='/listing/details' className='navItem'>
        Details
      </Link>
    </div>
  );
};

const Layout = ({ children }) => {
  return <div className='content'>{children}</div>;
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path='/listing'
          element={
            <Layout>
              <Listing />
            </Layout>
          }
        />
        <Route
          path='/listing/details'
          element={
            <Layout>
              <Details />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
