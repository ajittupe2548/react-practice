import React, { Component } from 'react'
import PortalDemo from './PortalDemo';

class CHome extends Component {
    render() {
        return (
            <div>
                <h1 className="heading">Hi from home page class</h1>
                <PortalDemo/>
            </div>
        )
    }
}

export default CHome;