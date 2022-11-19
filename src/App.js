import './App.css';
import CHome from './Components/CHome';

// As your app grows, you can catch a lot of bugs with typechecking. For some applications, you can use JavaScript extensions like Flow or TypeScript to typecheck your whole application. But even if you don’t use those, React has some built-in typechecking abilities. To run typechecking on the props for a component, you can assign the special propTypes property:

// PropTypes exports a range of validators that can be used to make sure the data you receive is valid. In this example, we’re using PropTypes.string. When an invalid value is provided for a prop, a warning will be shown in the JavaScript console. For performance reasons, propTypes is only checked in development mode.

// Default Prop Values - You can define default values for your props by assigning to the special defaultProps property:

function App() {
  return (
    <div className="App">
      <CHome/>
      <CHome name="John"/>
      <CHome name={1}/>
    </div>
  );
}

export default App;
