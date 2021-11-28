import React, { Component } from 'react'
import NameForm from './NameForm';

class c_home extends Component {
    render() {
        return (
            <div>
                <h1 className="heading">Hi from home page class</h1>
                <NameForm/>
            </div>
        )
    }
}

export default c_home;