import { createContext, memo, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default function MyApp() {
  return (
    <ThemeProvider>
      <Form />
    </ThemeProvider>
  )
}

const Form = () => {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

const Panel = ({ title, children }) => {
  const { theme } = useContext(ThemeContext);
  console.log(`*****Output is :  => Panel => theme:`, theme);
  useEffect(() => {
    document.documentElement.style.background = theme === 'dark' ? '#000' : '#fff';
    document.documentElement.style.color = theme === 'dark' ? '#fff' : '#000';
  }, [theme]);

  return (
    <section>
      <h1>{title} - {theme}</h1>
      {children}
    </section>
  )
}

const Button = memo(({ children }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log(`*****Output is :  => Button => theme:`, theme);
  return (
    <button onClick={toggleTheme}>
      {children} - {theme}
    </button>
  );
});
