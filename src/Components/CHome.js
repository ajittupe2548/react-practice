import React, { Component } from 'react'
import PortalDemo from './PortalDemo';

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