import './App.css';
import AxiosPost from './Components/AxiosPost';

// React and Web Components are built to solve different problems. Web Components provide strong encapsulation for reusable components, while React provides a declarative library that keeps the DOM in sync with your data. The two goals are complementary. As a developer, you are free to use React in your Web Components, or to use Web Components in React, or both.
// Most people who use React don’t use Web Components, but you may want to, especially if you are using third-party UI components that are written using Web Components.

function App() {
  return (
    <div className="App">
      <AxiosPost />
    </div>
  );
}

export default App;
