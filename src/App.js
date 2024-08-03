import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Listing from './Listing';
import Details from './Details';
import BreadCrumb from './BreadCrumb';

const Layout = ({ children }) => {
  return <div className='content'>{children}</div>;
};

function App() {
  return (
    <BrowserRouter>
      <h1>Beauty Products</h1>
      <BreadCrumb />
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
          path='/products'
          element={
            <Layout>
              <Listing />
            </Layout>
          }
        />
        <Route
          path='/products/:productName'
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
