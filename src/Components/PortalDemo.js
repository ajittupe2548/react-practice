import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// function PortalDemo() {
//     return ReactDOM.createPortal(
//         <h3>This text is from portal demo component.</h3>,
//         document.getElementById("portalRoot")
//     )
// }

class PortalDemo extends Component {
    render() {
        return ReactDOM.createPortal(
            <h3>This text is from portal demo component.</h3>,
            document.getElementById("portalRoot")
        )
    }
}


export default PortalDemo;