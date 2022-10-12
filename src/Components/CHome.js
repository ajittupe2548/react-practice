import React, { Component } from 'react';

class CHome extends Component {
    constructor() {
        super();
        this.state = {count : 0}
    }

    componentDidMount() {
        setInterval(() => {
            this.setState(prevState => ({count: prevState.count + 1}))
        }, 1000);
    }

    render() {
        return (
            <div>
                <h1 className="heading">Hi from home page class - {this.state.count}</h1>
            </div>
        )
    }
}

export default CHome;
