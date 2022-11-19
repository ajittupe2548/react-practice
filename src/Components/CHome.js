import React, { Component } from 'react'
import NameForm from './NameForm';

class CHome extends Component {
    render() {
        return (
            <div>
                <h1 className="heading">Hi from home page class</h1>
                <NameForm/>
            </div>
        )
    }
}

export default CHome;