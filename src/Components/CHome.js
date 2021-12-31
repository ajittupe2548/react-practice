import React, { Component, PureComponent } from 'react'

// Component creation with React.Component
class ComponentExample extends Component {
    render() {
        return (
            <div>ComponentExample</div>
        )
    }
}

// Component creation with React.PureComponent
class PureComponentExample extends PureComponent {
    render() {
        return (
            <div>PureComponentExample</div>
        )
    }
}

class CHome extends Component {
    render() {
        return (
            <div>
                <ComponentExample />
                <PureComponentExample />
            </div>
        )
    }
}

export default CHome;