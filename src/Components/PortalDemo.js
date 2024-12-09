import React, { Component } from 'react'
import ReactDOM from 'react-dom'

/*
createPortal lets us render some children into a different part of the DOM.

- A portal only changes the physical placement of the DOM node. In every other way, the JSX we render into a portal acts as a child node of the React component that renders it. For example, the child can access the context provided by the parent tree, and events bubble up from children to parents according to the React tree.

`createPortal(children, domNode, key?)`
- Parameters
    - children: Anything that can be rendered with React, such as a piece of JSX (e.g. <div /> or <SomeComponent />), a Fragment (<>...</>), a string or a number, or an array of these.
    - domNode: Some DOM node, such as those returned by document.getElementById(). The node must already exist. Passing a different DOM node during an update will cause the portal content to be recreated.
    - optional key: A unique string or number to be used as the portal’s key.
*/

// function PortalDemo() {
//     return ReactDOM.createPortal(
//         <h3>This text is from portal demo component.</h3>,
//         document.getElementById("portalRoot")
//     )
// }

class PortalDemo extends Component {
    render() {
        return ReactDOM.createPortal(
            <><h3>This text is from portal demo component.</h3>{this.props.children}</>,
            document.getElementById("portalRoot")
        )
    }
}


export default PortalDemo;