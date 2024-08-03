import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Listing from './Components/Listing';
import Details from './Components/Details';
import BreadCrumb from './Components/BreadCrumb';

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
