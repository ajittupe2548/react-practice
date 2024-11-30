import React, { Component } from "react";

class LightClass extends Component {
    state = {
        count: 0,
    };

    render() {
        return (
            <div>
                <h1>Light Component (Class)</h1>
                <p>Count: {this.state.count}</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>Increment</button>
            </div>
        );
    }
}

export default LightClass;
