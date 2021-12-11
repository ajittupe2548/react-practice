import React, { Component } from 'react'

class CHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
        this.inputRef = React.createRef();
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        })
    }

    handleClick = () => {
        console.log(this.state.value)
    }

    handleFocus = () => {
        this.inputRef.current.focus();
    }

    render() {
        return (
            <div>
                <input onChange={this.handleChange} ref={this.inputRef} value={this.state.value} type="text" />
                <button onClick={this.handleFocus}>Focus</button>
                <button onClick={this.handleClick}>Submit</button>
            </div>
        )
    }
}

export default CHome;