import React, { Component } from "react";

// Fibonacci calculation (expensive operation)
const fibonacci = (n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
};

class HeavyClass extends Component {
    state = {
        count: 0,
        fibNumber: 0,
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
            const result = fibonacci(40); // Fibonacci of 40 is very expensive
            this.setState({ fibNumber: result });
        }
    }

    render() {
        return (
            <div>
                <h1>Heavy Component (Class)</h1>
                <p>Fibonacci(40): {this.state.fibNumber}</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>Increment</button>
            </div>
        );
    }
}

export default HeavyClass;
