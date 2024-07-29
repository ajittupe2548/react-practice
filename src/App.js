import "./App.css";
import React, { Component } from "react";

class Example extends Component {
    constructor(props) {
        // console.log(this);  // 🔴 Can’t use `this` yet
        super(); // Use props argument here to access `this` in constructor
        console.log("this.props in constructor", this.props);
        this.state = {
            isOn: props
                .isOn /* If super(props) is used, then we can also use this.props.isOn here. Methods other than the constructor don't need super(props). */,
        };
    }

    render() {
      console.log("this.props in render", this.props);
        return <>Class Component {this.state.isOn ? "ON" : "OFF"}</>;
    }
}

class App extends Example {
    render() {
        return (
            <>
                <Example isOn={true} />
            </>
        );
    }
}

export default App;
