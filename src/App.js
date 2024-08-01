import { useEffect, useState, createContext, useContext } from 'react';
import './App.css';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className='header'>
      <div className='navList'>
        <Link to='/' className='navItem'>Home</Link>
        <Link to='/blogs' className='navItem'>Blogs</Link>
        <Link to='/contact' className='navItem'>Contact</Link>
      </div>
      <div className='iconWrapper' onClick={toggleTheme}>{theme}</div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='' element='Home' />
          <Route path='/blogs' element='Blogs' />
          <Route path='/contact' element='Contact' />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
