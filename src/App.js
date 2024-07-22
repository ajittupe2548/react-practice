import { createContext, memo, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  const [value, setValue] = useState("Dark");
  const [value2, setValue2] = useState("Dark");

  useEffect(() => {
    setTimeout(() => {
      setValue2("Light")
    }, 2000);
  }, []);

  return (
    <ThemeContext.Provider value={value}>
      <Form />
    </ThemeContext.Provider>
  )
}

const Form = () => {
  console.log(`*****Output is :  => Form => Form:`);
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

const Panel = ({ title, children }) => {
  console.log(`*****Output is :  => Panel => Panel:`);
  const theme = useContext(ThemeContext);
  return (
    <section>
      <h1>{title} - {theme}</h1>
      {children}
    </section>
  )
}

const Button = memo(({ children }) => {
  console.log(`*****Output is :  => Button => Button:`);
  const theme = useContext(ThemeContext);
  return (
    <button>
      {children} - {theme}
    </button>
  );
});
