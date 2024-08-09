import './App.css';
import React, { useState, useEffect, useRef } from 'react';

/*
Making setInterval Declarative with React Hooks: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
*/

/* First Attempt: Attach setInterval and clear on each render.

This code has a strange behavior.
When we run clearInterval and setInterval, their timing shifts. If we re-render and re-apply effects too often, the interval never gets a chance to fire!
*/

function Counter1() {
    let [count, setCount] = useState(0);

    useEffect(() => {
        let id = setInterval(() => {
            setCount(count + 1/*  */);
        }, 1000);
        return () => clearInterval(id);
    });

    return <h1>{count}</h1>;
}

/* Second Attempt: Using empty dependecy array without callback in setState

The problem is that useEffect captures the count from the first render. It is equal to 0. We never re-apply the effect so the closure in setInterval always references the count from the first render, and count + 1 is always 1. Oops!

- One way to fix it is to replace setCount(count + 1) with the “updater” form like setCount(c => c + 1).
- Second way we can form closure with useEffect callback instead of interval callback.
*/

function Counter2() {
    let [count, setCount] = useState(0);

    useEffect(() => {
        // let closureOutSideInterval = count;  // 2nd fix
        let id = setInterval(() => {
            setCount(count + 1);
            // setCount(++closureOutSideInterval);  // 2nd fix
            // setCount(prev => prev + 1);  // 1st fix
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return <h1>{count}</h1>;
}

/*
By contrast, setInterval does not describe a process in time — once you set the interval, you can’t change anything about it except clearing it.

That’s the mismatch between the React model and the setInterval API.

- The useEffect() Hook “forgets” the previous render too. It cleans up the last effect and sets up the next effect. The next effect closes over fresh props and state. This is why our first attempt worked for simple cases.

- But setInterval() does not “forget”. It will forever reference the old props and state until you replace it — which you can’t do without resetting the time.
*/

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function Counter() {
    let [count, setCount] = useState(0);
    let [delay, setDelay] = useState(1000);

    useInterval(() => {
        setCount(count + 1);
    }, delay);

    function handleDelayChange(e) {
        setDelay(Number(e.target.value));
    }

    return (
        <div>
            <h1>{count}</h1>
            <input value={delay} onChange={handleDelayChange} />
        </div>
    );
}


class CounterClass extends React.Component {
    state = {
        count: 0,
        delay: 1000,
    };

    componentDidMount() {
        this.interval = setInterval(this.tick, this.state.delay);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.delay !== this.state.delay) {
            clearInterval(this.interval);
            this.interval = setInterval(this.tick, this.state.delay);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick = () => {
        this.setState({
            count: this.state.count + 1
        });
    }

    handleDelayChange = (e) => {
        this.setState({ delay: Number(e.target.value) });
    }

    render() {
        return (
            <>
                <h1>{this.state.count}</h1>
                <input value={this.state.delay} onChange={this.handleDelayChange} />
            </>
        );
    }
}

function App() {

    return (
        <>
            First Try: <Counter1 />
            Second Try: <Counter2 />
            useInterval: <Counter />
            ClassExample: <CounterClass />
        </>
    );
}

export default App;
