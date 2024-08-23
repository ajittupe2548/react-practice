import React, { Component } from 'react'

/*
2. Always Be Ready to Render
- Avoid Timing Assumptions: Ensure your component can re-render anytime without relying on specific timing or events.

- Legacy Methods Caution: Avoid methods like componentWillReceiveProps that reset state based on props, as they can cause issues with frequent parent re-renders.

- Controlled vs. Uncontrolled Components:
    - Use fully controlled components to manage state through props.
Use uncontrolled components with a key to manage local state and reset when needed.
    - Don’t Sync Props and State: Treat "receiving props" as just another render. Manage state either fully through props or locally.

- The key prop in React is a special prop that has a unique meaning for React’s reconciliation algorithm. It's used to determine if a component should be re-rendered or remounted. If you rename key to anything else, React will no longer recognize it as a special identifier, and it won’t trigger the reset behavior.
*/

class TextInput extends React.Component {
    state = {
        value: ''
    };
    // 🔴 Resets local state on every parent render
    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
    }
    handleChange = (e) => {
        this.setState({ value: e.target.value });
    };
    render() {
        return (
            <input
                value={this.state.value}
                onChange={this.handleChange}
            />
        );
    }
}

export default class Render extends Component {
    componentDidMount() {
        setInterval(() => this.forceUpdate(), 1000);
    }

    render() {
        return (
            <>
                <TextInput value='Value' />
            </>
        )
    }
}
