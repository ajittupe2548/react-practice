import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeClick = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }

  return (
    <BrowserRouter>
      <div className='header'>
        <div className='navList'>
          <Link to='/' className='navItem'>Home</Link>
          <Link to='/blogs' className='navItem'>Blogs</Link>
          <Link to='/contact' className='navItem'>Contact</Link>
        </div>
        <div className='iconWrapper' onClick={handleThemeClick}>{theme}</div>
      </div>
      <Routes>
        <Route path='' element='Home' />
        <Route path='/blogs' element='Blogs' />
        <Route path='/contact' element='Contact' />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
