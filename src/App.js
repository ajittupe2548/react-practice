import "./App.css";
import React, { Component, useState, useEffect, useRef } from "react";

/* https://overreacted.io/a-complete-guide-to-useeffect/ */

/*
Each Render Has Its Own Props, State, event handlers, useEffect etc. (In short everything)

Whenever we update the state, React calls our component. Each render result “sees” its own counter state value which is a constant inside our function.
*/

class MyComponentClass1 extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }
  componentDidMount() {
    console.log("componentDidMount - state:", this.state);
    setTimeout(() => {
      this.setState({ count: 19 });
    }, 1000);
    setTimeout(() => {
      console.log("useEffect - latest state:", this.state);
    }, 3000);
  }

  render() {
    return <div>My Component</div>;
  }
}

const MyComponent1 = (props) => {
  const [state, setState] = useState(0);
  const latestState = useRef(state);

  useEffect(() => {
    setTimeout(() => {
      setState(19);
    }, 1000);
    latestState.current = state;
  }, [state]);

  useEffect(() => {
    console.log("useEffect - initial state:", state);
    setTimeout(() => {
      console.log(
        "useEffect - latest state:",
        state,
        latestState.current
      );
    }, 3000);
  }, []);

  return <div>My Component</div>;
};

function MyComponent2() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

class MyComponentClass2 extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    const count = this.state.count;
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  }

  componentDidUpdate() {
    const count = this.state.count;
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  }

  render() {
    return (
      <>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({
          count: this.state.count + 1
        })}>
          Click me
        </button>
      </>
    );
  }
}

function App() {
  return (
    <div className="App">
      <MyComponentClass2 />
    </div>
  );
}

export default App;
