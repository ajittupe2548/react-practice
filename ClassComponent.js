import React, { Component } from "react";

export class HomeClass extends Component {
    constructor(props) {
        console.log(`*****Output is :  => HomeClass => constructor:`)
        super(props);
    }

    componentDidMount() {
        console.log(`*****Output is :  => HomeClass => componentDidMount:`)
    }

    componentDidUpdate() {
        console.log(`*****Output is :  => HomeClass => componentDidUpdate:`)
    }

    render() {
        console.log(`*****Output is :  => HomeClass => render:`)
        return (
            <>
                <HomeClass1 />
                <HomeClass2 />
            </>
        );
    }
}

class HomeClass1 extends Component {
    constructor(props) {
        console.log(`*****Output is :  => HomeClass1 => constructor:`)
        super(props);
    }

    async componentDidMount() {
        console.log(`*****Output is :  => HomeClass1 => componentDidMount:`)

        const data = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await data.json();
        console.log(`*****Output is :  => HomeClass1 => componentDidMount => users:`, users)
    }

    componentDidUpdate() {
        console.log(`*****Output is :  => HomeClass1 => componentDidUpdate:`)
    }

    componentWillUnmount() {
        console.log(`*****Output is :  => HomeClass1 => componentWillUnmount:`,)
    }

    render() {
        console.log(`*****Output is :  => HomeClass1 => render:`)
        return (
            <>
                <h2>Home Class 1</h2>
            </>
        );
    }
}

class HomeClass2 extends Component {
    constructor(props) {
        console.log(`*****Output is :  => HomeClass2 => constructor:`)
        super(props);

        this.state = {
            count: 0,
        }

        this.timer = null;
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            console.log(`*****Output is :  => HomeClass2 => setInterval:`,)
        }, 1000);

        console.log(`*****Output is :  => HomeClass2 => componentDidMount:`)
    }

    componentDidUpdate() {
        console.log(`*****Output is :  => HomeClass2 => componentDidUpdate:`)
    }

    componentWillUnmount() {
        console.log(`*****Output is :  => HomeClass2 => componentWillUnmount:`)
        clearInterval(this.timer)
    }

    render() {
        console.log(`*****Output is :  => HomeClass2 => render:`)
        return (
            <>
                <h2 onClick={() => this.setState({count: this.state.count + 1})}>Home Class 2 - {this.state.count}</h2>
            </>
        );
    }
}

export class AboutClass extends Component {
    constructor(props) {
        super(props);
        this.state ={
            count1: 0,
            count2: 0,
        }
    }

    increment = () => {
        /* This will re-render component after button click */
        // this.setState(prev => ({count1: prev.count1 + 1, count2: prev.count2 + 1}));

        /* This will also re-render component after button click - Component re-render doesn't depend on individual state update. */
        this.setState(prev => ({count1: prev.count1 + 1}));
        this.setState(prev => ({count2: prev.count2 + 1}));
    }

    render() {
        console.log(`*****Output is :  => AboutClass => render:`)
        return (
            <>
                <h2>About Class</h2>
                <p>Count 1 - {this.state.count1}</p>
                <p>Count 2 - {this.state.count2}</p>
                <button onClick={() => this.increment()}>Increment</button>
            </>
        );
    }
}
