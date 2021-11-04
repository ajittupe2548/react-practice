import React, { Component } from 'react'

class CounterButton extends Component {
    constructor(props) {
        super(props);
        this.state = {count: 1};
    }

    // Most of the time, you can use React.PureComponent instead of writing your own shouldComponentUpdate.
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.color !== nextProps.color) {
            return true;
        }
        if (this.state.count !== nextState.count) {
            return true;
        }
        return false;
    }

    render() {
        console.log(`*****Output is :  => CounterButton => render => render`)
        return (
        <button
            color={this.props.color}
            onClick={() => this.setState(state => ({count: state.count + 1}))}>
            Count: {this.state.count}
        </button>
        );
    }
}

export default CounterButton;