import React, { Component } from 'react'
class CHome extends Component {
    constructor(props) {
        super(props)

        this.headingRef = React.createRef();
    }

    render() {
        return (
            <div>
                <React.StrictMode>
                    <h1 className="heading" ref={this.headingRef}>Hi from home page class</h1>
                    <h1 className="heading" ref='heading'>Hi from home page class</h1>
                </React.StrictMode>
            </div>
        )
    }
}

export default CHome;