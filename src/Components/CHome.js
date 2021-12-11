import React, { Component } from 'react'
import ClickCounter from './ClickCounter';
import HoverCounter from './HoverCounter';

class CHome extends Component {
    render() {
        return (
            <div>
                <ClickCounter name="Ajit"/>
                <HoverCounter/>
            </div>
        )
    }
}

export default CHome;