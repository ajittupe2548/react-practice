/*
What is the order of life cycle method calls in Class Based Components?
<Parent>
    <Child1 />
    <Child2 />
</Parent>

constructor parent
render parent
    constructor child1
    render child1
    constructor child2
    render child2
    componentDidMount child1
    componentDidMount child2
componentDidMount parent
async operation inside children or parent componentDidMount (If any)


Why do we use componentDidMount?
componentDidMount is the final step of the mounting process of class components. We use componentDidMount to attach event listeners to the elements, make api calls, dom manipulation etc. This method run after first render only.


Why do we use componentWillUnmount?
This method is called during the unmounting phase of the React Lifecycle of class components. This method called before a component is removed from the DOM. We use componentWillUnmount to remove event listeners from elements and clear intervals.


Why do we use super(props) in constructor?
super(props) is used in a class component's constructor to call the constructor of the parent class (i.e., the Component class in this case) and pass the props object to it. This is necessary because when you define a constructor in a subclass (child class), you must call the constructor of the superclass (parent class) before doing anything else.
If we don't call super(props) in the constructor then we will encounter a ReferenceError indicating `this` in constructor.
If we call super() without props argument in the constructor then we will get this.props as undefined in constructor only not in render and other methods.


Why can't we have the callback function of useEffect async?
The reason for this limitation is related to how React handles the return value of the useEffect callback. When you use an async function, it implicitly returns a Promise. However, React expects the return value of the useEffect callback to be either undefined or a cleanup function. If you use an async function as the useEffect callback, React won't be able to handle the returned Promise properly, leading to potential issues or unexpected behavior.
If you make useEffect async then you will encounter a warning saying `useEffect must not return anything besides a function, which is used for clean-up.`


Add state variable in about page for functional and class component and make 2 different states. Update states on button click and check how many time component re-renders.
In the class component if you set different state in one setState or in multiple setState's then also component re-render once.
In the functional component if you set different state with different setter functions then also component re-render once.
*/
