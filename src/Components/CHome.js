import React, { Component } from 'react'

class CHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
        // Refs are created using React.createRef() and attached to React elements via the ref attribute.
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
        // When a ref is passed to an element in render, a reference to the node becomes accessible at the current attribute of the ref.
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