import React, { Component } from 'react'
import BlurExample from './BlurExample';
import OuterClickExample from './OuterClickExample'

class CHome extends Component {
    render() {
        return (
            <div>
                <h1 className="heading">Hi from home page class</h1>
                <BlurExample/>
                <BlurExample/>
                <BlurExample/>
                <OuterClickExample />
                <OuterClickExample />
                <OuterClickExample />
            </div>
        )
    }
}

export default CHome;