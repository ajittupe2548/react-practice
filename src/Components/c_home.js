import React, { Component } from 'react'

class c_home extends Component {
    render() {
        return (
            <div>
                <h1 className="heading">Hi {this.props.name}</h1>
            </div>
        )
    }
}

export default c_home;