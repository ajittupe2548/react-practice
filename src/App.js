import './App.css';
import React, { useState, useEffect, useRef } from 'react';

/*
Making setInterval Declarative with React Hooks: https://overreacted.io/making-setinterval-declarative-with-react-hooks/


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
        <>
            <h1>{count}</h1>
            <input value={delay} onChange={handleDelayChange} />
        </>
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
            <Counter />
            <CounterClass />
        </>
    );
}

export default App;
