import React, { Component } from 'react'

class CHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: 'Please click',
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({
            message: 'Thank you for clicking',
        })
    }
    render() {
        return (
            <div>
                <h1 className="heading">{this.state.message}</h1>
                <button onClick={this.handleClick}>Click</button>
            </div>
        )
    }
}

export default CHome;