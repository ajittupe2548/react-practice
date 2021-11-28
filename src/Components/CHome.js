import React, { Component } from 'react'

class CHome extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
        this.handleClick = this.handleClick.bind(this);    // Third : Binding in constructor(Recommended)
    }

    handleClick() {
    // handleClick = () => {    Fourth : Converting simple function to arrow function
    this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
    }));
    }

    render() {
    return (
        // <button onClick={this.handleClick.bind(this)}>   First : Binding in element itself
        // <button onClick={() => this.handleClick()}>  Second : Using arrow function
        <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
    );
    }
}

export default CHome;