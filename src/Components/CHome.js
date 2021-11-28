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
        let button;
        if(this.state.isLoggedIn){
            button = <button onClick={this.handleLogoutClick}>Logout</button>
        }
        else{
            button = <button onClick={this.handleLoginClick}>Login</button>
        }
        return (
            <div>
                {button}
            </div>
        )
    }
}

export default CHome;