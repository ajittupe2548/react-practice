import './App.css';
import CHome from './Components/CHome';
import FHome from './Components/FHome';

// Why Accessibility?
// Web accessibility (also referred to as a11y) is the design and creation of websites that can be used by everyone. Accessibility support is necessary to allow assistive technology to interpret web pages.

// Semantic HTML - Semantic HTML is the foundation of accessibility in a web application. Using the various HTML elements to reinforce the meaning of information in our websites will often give us accessibility for free.

// Sometimes we break HTML semantics when we add <div> elements to our JSX to make our React code work, especially when working with lists (<ol>, <ul> and <dl>) and the HTML <table>. In these cases we should rather use React Fragments(<></>) to group together multiple elements.

function App() {
  return (
    <div className="App">
      <CHome/>
    </div>
  );
}

export default App;
