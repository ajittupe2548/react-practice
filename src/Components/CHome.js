import React, { Component } from 'react'

class CHome extends Component {
    render() {
        const { greetings, sum, isMobile } = this.props;
        return (
            // React.createElement method instead of JSX
            React.createElement("div", null, React.createElement("h1", {className: "heading"}, greetings || sum || isMobile && 'Mobile'))
        )
    }
}

export default CHome;