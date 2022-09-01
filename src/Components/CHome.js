import React, { Component } from 'react'

class CHome extends Component {
    constructor(props) {
        super(props)

        if(this.props.heroName=="Joker") {
            throw ("Joker is not hero")
        }
    }

    render() {
        return (
            <h1 className="heading">Hi from {this.props.heroName}</h1>
        )
    }
}

export default CHome;