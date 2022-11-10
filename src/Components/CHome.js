import React, { Component } from 'react'

class CHome extends Component {
    render() {
        return (
            React.createElement('div', null, `Hello ${this.props.toWhat}`)
        )
    }
}

export default CHome;