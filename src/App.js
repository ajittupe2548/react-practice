import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Listing from './Components/Listing';
import Details from './Components/Details';
import BreadCrumb from './Components/BreadCrumb';

function App() {
  return (
    <BrowserRouter>
      <h1>Beauty Products</h1>
      <BreadCrumb />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Listing />} />
        <Route path='/products/:productName' element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
