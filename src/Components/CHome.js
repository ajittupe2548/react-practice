import React, { Component, PureComponent } from 'react'

// Component creation with React.Component - React.Component is the base class for React components when they are defined using ES6 classes
class ComponentExample extends Component {
    render() {
        return (
            <div>ComponentExample</div>
        )
    }
}

// Component creation with React.PureComponent - React.PureComponent is similar to React.Component. The difference between them is that React.Component doesn’t implement shouldComponentUpdate(), but React.PureComponent implements it with a shallow prop and state comparison.
// If your React component’s render() function renders the same result given the same props and state, you can use React.PureComponent for a performance boost in some cases.
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
