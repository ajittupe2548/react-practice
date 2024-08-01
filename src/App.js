import './App.css';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Link to='/'>Home</Link>
      <Link to='/blogs'>Blogs</Link>
      <Link to='/contact'>Contact</Link>
      <Routes>
        <Route path='' element='home' />
        <Route path='/blogs' element='Blogs' />
        <Route path='/contact' element='Contact' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
