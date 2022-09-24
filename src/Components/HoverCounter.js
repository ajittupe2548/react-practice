import React, { Component } from "react";
import withCounter from "./withCounter";

class HoverCounter extends Component {
    render() {
        const { count, incrementCount } = this.props;
        return (
            <div>
                <h1 onMouseOver={incrementCount}>
                    Hover {count} times
                </h1>
            </div>
        );
    }
}

HoverCounter.displayName = "HoverCounter";
export default withCounter(HoverCounter,10);
