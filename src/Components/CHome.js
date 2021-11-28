import React, { Component } from 'react'

class CHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: false,
        }
    }

    handleLoginClick = () => {
        this.setState({
            isLoggedIn: true,
        })
    }

    handleLogoutClick = () => {
        this.setState({
            isLoggedIn: false,
        })
    }

    render() {
        return (
            <div>
                {this.state.isLoggedIn ? <button onClick={this.handleLogoutClick}>Logout</button> : <button onClick={this.handleLoginClick}>Login</button>}
            </div>
        )
    }
}

export default CHome;