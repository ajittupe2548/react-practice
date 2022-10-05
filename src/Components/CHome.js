import React, { Component } from 'react'
import PortalDemo from './PortalDemo';

// Event Bubbling Through Portals - Even though a portal can be anywhere in the DOM tree, it behaves like a normal React child in every other way. Features like context work exactly the same regardless of whether the child is a portal, as the portal still exists in the React tree regardless of position in the DOM tree. This includes event bubbling. An event fired from inside a portal will propagate to ancestors in the containing React tree, even if those elements are not ancestors in the DOM tree.

function Child() {
    return <button>Click</button>;
}

class CHome extends Component {
    handleclick = () => {
        console.log(`*****Output is :  => CHome => handleclick`);
    }

    render() {
        return (
            <div onClick={() => this.handleclick()}>
                <h1 className="heading">Hi from home page class</h1>
                <PortalDemo><Child /></PortalDemo>
            </div>
        )
    }
}

export default CHome;