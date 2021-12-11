import React, { Component } from 'react'
import FRParentInput from './FRParentInput';
class CHome extends Component {
    render() {
        return (
            <div>
                <h1 className="heading">Hi from home page class</h1>
                <FRParentInput />
            </div>
        )
    }
}

export default CHome;