import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Home = () => <div>Home</div>
const Listing = () => <div>Listing</div>
const Details = () => <div>Details</div>

const Header = () => {
  return (
    <div className='navBar'>
      <Link to='/' className='navItem'>Home</Link>
      <Link to='/listing' className='navItem'>Listing</Link>
      <Link to='/listing/details' className='navItem'>Details</Link>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/listing' element={<Listing />} />
        <Route path='/listing/details' element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
