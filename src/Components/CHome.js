import React, { Component } from 'react';

/* Lifecycle of Components - Each component in React has a lifecycle which you can monitor and manipulate during its three main phases. */

/*
A) Mounting: Mounting means putting elements into the DOM.
    1) constructor() - when the component is initiated, and it is the natural place to set up the initial state and other initial values.
    2) getDerivedStateFromProps() - getDerivedStateFromProps is invoked right before calling the render method, both on the initial mount and on subsequent updates.It should return an object to update the state, or null to update nothing. This method is called right before rendering the element(s) in the DOM.
    3) render() - method that actually outputs the HTML to the DOM.
    4) componentDidMount() - called after the component is rendered. */

/*
B) Updating - The next phase in the lifecycle is when a component is updated. A component is updated whenever there is a change in the component's state or props.
    1) getDerivedStateFromProps() - getDerivedStateFromProps is invoked right before calling the render method, both on the initial mount and on subsequent updates.It should return an object to update the state, or null to update nothing. This method is called right before rendering the element(s) in the DOM.
    2) shouldComponentUpdate() - you can return a Boolean value that specifies whether React should continue with the rendering or not.Default value is true.
    3) render() - re - render the HTML to the DOM, with the new changes.
    4) getSnapshotBeforeUpdate() - In this method you have access to the props and state before the update, meaning that even after the update, you can check what the values were before the update. getSnapshotBeforeUpdate() is invoked right before the most recently rendered output is committed to e.g. the DOM. It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. Any value returned by this lifecycle method will be passed as a parameter to componentDidUpdate().
    5) componentDidUpdate(prevProps, prevState, snapshot) - Called after the component is updated in the DOM. */

/*
C) Unmounting - The next phase in the lifecycle is when a component is removed from the DOM, or unmounting as React likes to call it.
    1) componentWillUnmount() - called when the component is about to be removed from the DOM. */

class CHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: 'Please click',
            stateCounter: this.props.counter,
        }
        this.btnRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        console.log(`*****Output is :  => CHome => constructor => constructor`)
    }

    /* UNSAFE_componentWillMount() {
        console.log(`*****Output is :  => CHome => UNSAFE_componentWillMount => UNSAFE_componentWillMount:`);
    } */

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(`*****Output is :  => CHome => getDerivedStateFromProps => getDerivedStateFromProps:`, nextProps, prevState);
        if (nextProps.counter !== prevState.counter) {
            return { stateCounter: nextProps.counter };
        }
        return null;
    }

    componentDidMount() {
        console.log(`*****Output is :  => CHome => componentDidMount => componentDidMount`)
        this.btnRef.current.addEventListener("click", this.handleClick)
    }

    /* UNSAFE_componentWillReceiveProps() {
        console.log(`*****Output is :  => CHome => UNSAFE_componentWillReceiveProps => UNSAFE_componentWillReceiveProps:`);
    } */

    shouldComponentUpdate(nextProps, nextState) {
        console.log(`*****Output is :  => CHome => shouldComponentUpdate => shouldComponentUpdate`);

        return ((nextProps.counter !== this.props.counter) || (nextState.stateCounter !== this.state.stateCounter) || (nextState.message !== this.state.message));
    }

    /* UNSAFE_componentWillUpdate() {
        console.log(`*****Output is :  => CHome => UNSAFE_componentWillUpdate => UNSAFE_componentWillUpdate:`);
    } */

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log(`*****Output is :  => CHome => getSnapshotBeforeUpdate => getSnapshotBeforeUpdate:`, prevProps, prevState);
        return 'snapshot'
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(`*****Output is :  => CHome => componentDidUpdate => componentDidUpdate`, prevProps, prevState, snapshot);
    }

    componentWillUnmount() {
        console.log(`*****Output is :  => CHome => componentWillUnmount => componentWillUnmount`)
        this.btnRef.current.removeEventListener("click", this.handleClick)
    }

    handleClick() {
        this.setState({
            message: 'Thank you for clicking',
        })
    }
    render() {
        console.log(`*****Output is :  => CHome => render => render`)
        return (
            <div>
                <h1 className="heading">Message - {this.state.message}</h1>
                <h2>Counter - {this.state.stateCounter}</h2>
                <button ref={this.btnRef}>Update message</button>
            </div>
        )
    }
}

export default CHome;