import React, { Component } from 'react';

// A) Commonly Used Lifecycle Methods:
// 1) render() - The render() method is the only required method in a class component. When called, it should examine this.props and this.state and return one of the following types:
// - React elements. Typically created via JSX. For example, <div /> and <MyComponent /> are React elements that instruct React to render a DOM node, or another user-defined component, respectively.
// - Arrays and fragments. Let you return multiple elements from render. See the documentation on fragments for more details.
// - Portals. Let you render children into a different DOM subtree. See the documentation on portals for more details.
// - String and numbers. These are rendered as text nodes in the DOM.
// - Booleans or null or undefined. Render nothing.

// The render() function should be pure, meaning that it does not modify component state, it returns the same result each time it’s invoked, and it does not directly interact with the browser. If you need to interact with the browser, perform your work in componentDidMount() or the other lifecycle methods instead. Keeping render() pure makes components easier to think about.

// Note - render() will not be invoked if shouldComponentUpdate() returns false.

// 2) constructor() - If you don’t initialize state and you don’t bind methods, you don’t need to implement a constructor for your React component.
// The constructor for a React component is called before it is mounted. When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement. Otherwise, this.props will be undefined in the constructor, which can lead to bugs.
// Typically, in React constructors are only used for two purposes:
// - Initializing local state by assigning an object to this.state.
// - Binding event handler methods to an instance.
// You should not call setState() in the constructor(). Instead, if your component needs to use local state, assign the initial state to this.state directly in the constructor

// 3) componentDidMount() - componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
// This method is a good place to set up any subscriptions. If you do that, don’t forget to unsubscribe in componentWillUnmount().
// You may call setState() immediately in componentDidMount(). It will trigger an extra rendering, but it will happen before the browser updates the screen. This guarantees that even though the render() will be called twice in this case, the user won’t see the intermediate state.

// 4) componentDidUpdate(prevProps, prevState, snapshot) - componentDidUpdate() is invoked immediately after updating occurs. This method is not called for the initial render.
// Use this as an opportunity to operate on the DOM when the component has been updated. This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).
// You may call setState() immediately in componentDidUpdate() but note that it must be wrapped in a condition like in the example above, or you’ll cause an infinite loop. It would also cause an extra re-rendering which, while not visible to the user, can affect the component performance.
// Note - componentDidUpdate() will not be invoked if shouldComponentUpdate() returns false.

// 5) componentWillUnmount() - componentWillUnmount() is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in componentDidMount().
// You should not call setState() in componentWillUnmount() because the component will never be re-rendered. Once a component instance is unmounted, it will never be mounted again.

// B) Rarely Used Lifecycle Methods - The methods in this section correspond to uncommon use cases.
// 1) shouldComponentUpdate(nextProps, nextState) - Use shouldComponentUpdate() to let React know if a component’s output is not affected by the current change in state or props. The default behavior is to re-render on every state change, and in the vast majority of cases you should rely on the default behavior.
// shouldComponentUpdate() is invoked before rendering when new props or state are being received. Defaults to true. This method is not called for the initial render or when forceUpdate() is used.
// This method only exists as a performance optimization. Do not rely on it to “prevent” a rendering, as this can lead to bugs. Consider using the built-in PureComponent instead of writing shouldComponentUpdate() by hand.
// We do not recommend doing deep equality checks or using JSON.stringify() in shouldComponentUpdate(). It is very inefficient and will harm performance.

// 2) static getDerivedStateFromProps(props, state) - getDerivedStateFromProps is invoked right before calling the render method, both on the initial mount and on subsequent updates. It should return an object to update the state, or null to update nothing.

// 3) getSnapshotBeforeUpdate(prevProps, prevState) - getSnapshotBeforeUpdate() is invoked right before the most recently rendered output is committed to e.g. the DOM. It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. Any value returned by this lifecycle method will be passed as a parameter to componentDidUpdate(). This use case is not common, but it may occur in UIs like a chat thread that need to handle scroll position in a special way. A snapshot value (or null) should be returned.

// 4) static getDerivedStateFromError(error) - This lifecycle is invoked after an error has been thrown by a descendant component. It receives the error that was thrown as a parameter and should return a value to update state.

// 5) componentDidCatch(error, info) - This lifecycle is invoked after an error has been thrown by a descendant component. It receives two parameters:
// error - The error that was thrown.
// info - An object with a componentStack key containing information about which component threw the error.

// C) Other APIs - Unlike the lifecycle methods above (which React calls for you), the methods below are the methods you can call from your components. There are just two of them: setState() and forceUpdate().
// 1) setState(updater[, callback]) - setState() enqueues changes to the component state and tells React that this component and its children need to be re-rendered with the updated state. This is the primary method you use to update the user interface in response to event handlers and server responses.
// setState() does not always immediately update the component. It may batch or defer the update until later. This makes reading this.state right after calling setState() a potential pitfall. Instead, use componentDidUpdate or a setState callback (setState(updater, callback)), either of which are guaranteed to fire after the update has been applied. If you need to set the state based on the previous state, read about the updater argument below.
// this.setState((state, props) => {
//     return {counter: state.counter + props.step};
// });
// Both state and props received by the updater function are guaranteed to be up-to-date. The output of the updater is shallowly merged with state.
// The second parameter to setState() is an optional callback function that will be executed once setState is completed and the component is re-rendered. Generally we recommend using componentDidUpdate() for such logic instead.

// 2) component.forceUpdate(callback) - By default, when your component’s state or props change, your component will re-render. If your render() method depends on some other data, you can tell React that the component needs re-rendering by calling forceUpdate(). Calling forceUpdate() will cause render() to be called on the component, skipping shouldComponentUpdate(). This will trigger the normal lifecycle methods for child components, including the shouldComponentUpdate() method of each child. React will still only update the DOM if the markup changes.
// Normally you should try to avoid all uses of forceUpdate() and only read from this.props and this.state in render().

// D) Class Properties
// 1) defaultProps - defaultProps can be defined as a property on the component class itself, to set the default props for the class. This is used for undefined props, but not for null props.

// 2) displayName - The displayName string is used in debugging messages. Usually, you don’t need to set it explicitly because it’s inferred from the name of the function or class that defines the component. You might want to set it explicitly if you want to display a different name for debugging purposes or when you create a higher-order component, see Wrap the Display Name for Easy Debugging for details.

// E) Instance Properties
// 1) props - this.props contains the props that were defined by the caller of this component. See Components and Props for an introduction to props. In particular, this.props.children is a special prop, typically defined by the child tags in the JSX expression rather than in the tag itself.

// 2) state - The state contains data specific to this component that may change over time. The state is user-defined, and it should be a plain JavaScript object. Never mutate this.state directly, as calling setState() afterwards may replace the mutation you made. Treat this.state as if it were immutable.

class CHome extends Component {
    constructor(props) {
        console.log(`*****Output is :  => CHome => constructor => constructor`);
        super(props);
        this.state = { counter: 0 };
        this.timer = null;
    }

    componentDidMount() {
        console.log(`*****Output is :  => CHome => componentDidMount => componentDidMount`);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(`*****Output is :  => CHome => componentDidUpdate => componentDidUpdate`, prevProps, prevState, snapshot);
    }

    componentWillUnmount() {
        console.log(`*****Output is :  => CHome => componentWillUnmount => componentWillUnmount`);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(`*****Output is :  => CHome => shouldComponentUpdate => shouldComponentUpdate`, nextProps, nextState);
        if(this.state.counter === nextState.counter) {
            return false;
        }
        return true;
    }

    static getDerivedStateFromProps(props, state) {
        console.log(`*****Output is :  => CHome => getDerivedStateFromProps => getDerivedStateFromProps`, props, state);
        return state;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log(`*****Output is :  => CHome => getSnapshotBeforeUpdate => getSnapshotBeforeUpdate`, prevProps, prevState);
        return 1;
    }

    // static getDerivedStateFromError(error) {
    //     return { hasError: true };
    // }

    // componentDidCatch(error, info) {
    //     console.log(`*****Output is :  => CHome => componentDidCatch => componentDidCatch`, error, info);
    // }

    handleClick = () => {
        this.setState({counter: this.state.counter+1})
    }

    render() {
        console.log(`*****Output is :  => CHome => render => render`);
        return (
            <div onClick={this.handleClick}>
                Click - {this.state.counter}
            </div>
        )
    }
}

CHome.defaultProps = {
    color: 'blue'
};

CHome.displayName = "Click Counter";

export default CHome;
