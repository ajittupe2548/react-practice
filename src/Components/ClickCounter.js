import React, { Component } from "react";
import withCounter from "./withCounter";

class ClickCounter extends Component {
    render() {
        const { count, incrementCount } = this.props;
        return (
            <div>
                <button onClick={incrementCount}>Click {count} times {this.props.name}</button>
            </div>
        );
    }
}

ClickCounter.displayName = "ClickCounter";
export default withCounter(ClickCounter,5);
