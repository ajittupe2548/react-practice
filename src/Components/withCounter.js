import React from 'react'

const withCounter = (WrappedComponent, incrementValue) => {
    class withCounter extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                count: 0,
            };
        }

        incrementCount = () => {
            this.setState({
                count: this.state.count + incrementValue,
            });
        };
        render() {
            return (<WrappedComponent count={this.state.count} incrementCount={this.incrementCount} {...this.props}/>)
        }
    }
    return withCounter;
}

export default withCounter;